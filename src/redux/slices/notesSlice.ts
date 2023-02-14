import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
// AXIOS
import { AxiosError } from "axios";
import axiosInstance from "../../utils/axios";
// REDUX STORE
import { State } from "../api/store";
// TS
import {
  NoteType,
  NoteResponsePayload,
  WriteNoteContent,
  filterByType,
  NoteUpdateType,
  getAllNotesParamsType,
} from "../../types";
// Config
import { siteUrl } from "../../config";

const notesAdapter = createEntityAdapter<NoteType>({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

type initialStateType = {
  loadingNotes: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingNote: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  filterBy: filterByType;
};

const initialState = notesAdapter.getInitialState({
  loadingNotes: "IDLE", // "IDLE" | "PENDING" | "SUCCEDED" | "FAILED",
  loadingNote: "IDLE", // "IDLE" | "PENDING" | "SUCCEDED" | "FAILED"
  filterBy: "title",
}) as EntityState<NoteType> & initialStateType;

// THUNKS
export const getNotes = createAsyncThunk<
  NoteResponsePayload | AxiosError,
  getAllNotesParamsType
>("/notes/getNotes", async ({ createdById, title }) => {
  try {
    const { data } = await axiosInstance.get(
      `/notes?includeStyleOptions=true&createdById=${createdById}&title=${title}`
    );
    return data as NoteResponsePayload;
  } catch (error) {
    return error as AxiosError;
  }
});

export const getNoteById = createAsyncThunk<
  NoteResponsePayload | AxiosError,
  string
>("notes/getNoteById", async (id) => {
  try {
    const { data } = await axiosInstance.get(
      `/notes/${id}?includeStyleOptions=true`
    );
    return data as NoteResponsePayload;
  } catch (error) {
    return error as AxiosError;
  }
});

export const deleteNoteById = createAsyncThunk<
  NoteResponsePayload | AxiosError,
  string
>("/notes/deleteNoteById", async (id?) => {
  try {
    const { data } = await axiosInstance.delete(`/notes/delete/${id}`);
    return data as NoteResponsePayload;
  } catch (error) {
    return error as AxiosError;
  }
});

export const updateNoteById = createAsyncThunk<
  NoteResponsePayload | AxiosError,
  NoteUpdateType
>("/notes/updateNoteById", async (mutableBody) => {
  try {
    const { data } = await axiosInstance.patch(
      `/notes/update/${mutableBody.id}?includeStyleOptions=true`,
      mutableBody
    );
    return data as NoteResponsePayload;
  } catch (error) {
    return error as AxiosError;
  }
});

export const createNote = createAsyncThunk<
  NoteResponsePayload | AxiosError,
  WriteNoteContent
>("/notes/createNote", async (mutableBody) => {
  // Removes the note_uid from the newMutableBody
  const { note_uid, ...newMutableBody } = mutableBody;
  try {
    const { data } = await axiosInstance.post(
      "/notes/create?includeStyleOptions=true",
      newMutableBody
    );
    return data as NoteResponsePayload;
  } catch (error) {
    return error as AxiosError;
  }
});

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setFilterBy(state, action: PayloadAction<filterByType>) {
      state.filterBy = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getNotes.pending, (state, action) => {
        notesAdapter.removeAll(state);
        state.loadingNotes = "PENDING";
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        const { notes } = action.payload as NoteResponsePayload;
        const { response } = action.payload as AxiosError;

        if (response && response.statusText === "Not Found") {
          notesAdapter.upsertMany(state, []);
        } else if (notes) {
          notes.map((note: NoteType) => {
            note.id = note.note_uid;
            return note;
          });
          notesAdapter.upsertMany(state, notes as NoteType[]);
        }
        state.loadingNotes = "SUCCEDED";
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.loadingNotes = "FAILED";
        notesAdapter.removeAll(state);
      })
      .addCase(getNoteById.pending, (state, action) => {
        state.loadingNote = "PENDING";
      })
      .addCase(getNoteById.fulfilled, (state, action) => {
        const { note } = action.payload as NoteResponsePayload;
        if (note) {
          note.id = note.note_uid;
        }
        notesAdapter.upsertOne(state, note as NoteType);
        state.loadingNote = "SUCCEDED";
      })
      .addCase(getNoteById.rejected, (state, action) => {
        state.loadingNote = "FAILED";
      })
      .addCase(deleteNoteById.pending, (state, action) => {
        state.loadingNote = "PENDING";
      })
      .addCase(deleteNoteById.fulfilled, (state, action) => {
        const { note } = action.payload as NoteResponsePayload;
        const { note_uid } = note as NoteType;
        notesAdapter.removeOne(state, note_uid as string);
        state.loadingNote = "SUCCEDED";
      })
      .addCase(deleteNoteById.rejected, (state, action) => {
        state.loadingNote = "FAILED";
      })
      .addCase(updateNoteById.pending, (state, action) => {
        state.loadingNote = "PENDING";
      })
      .addCase(updateNoteById.fulfilled, (state, action) => {
        const { note } = action.payload as NoteResponsePayload;
        if (note) {
          note.id = note.note_uid;
        }
        notesAdapter.upsertOne(state, note as NoteType);
        state.loadingNote = "SUCCEDED";
      })
      .addCase(updateNoteById.rejected, (state, action) => {
        state.loadingNote = "FAILED";
      })
      .addCase(createNote.pending, (state, action) => {
        state.loadingNote = "PENDING";
      })
      .addCase(createNote.fulfilled, (state, action) => {
        const { note } = action.payload as NoteResponsePayload;
        if (note) {
          note.id = note.note_uid;
          delete note.note_uid;
        }
        notesAdapter.addOne(state, note as NoteType);
        window.location.href = `${siteUrl}/notes/${note.id}`;
        state.loadingNote = "SUCCEDED";
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loadingNote = "FAILED";
      });
  },
});

// SELECTORS
export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
} = notesAdapter.getSelectors((state: State) => state.notes);

export const selectFilterBy = (state: State) => state.notes.filterBy;

// LOADING SELECTORS
export const selectLoadingNotes = (state: State) => state.notes.loadingNotes;
export const selectLoadingNote = (state: State) => state.notes.loadingNote;

// ACTIONS
export const { setFilterBy } = notesSlice.actions;

// REDUCER
export default notesSlice.reducer;
