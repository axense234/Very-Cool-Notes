// Redux Toolkit
import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  EntityState,
} from "@reduxjs/toolkit";
// AXIOS
import { AxiosError } from "axios";
import axiosInstance from "../../utils/axios";
// REDUX STORE
import { State } from "../api/store";
// TS
import {
  AuthorType,
  AuthorResponsePayload,
  AuthorUpdateType,
} from "../../types";
// Config
import { siteUrl } from "../../config";

const authorsAdapter = createEntityAdapter<AuthorType>({
  sortComparer: (a, b) => a.username.localeCompare(b.username),
});

type initialStateType = {
  loadingAuthors: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingAuthor: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
};

const initialState = authorsAdapter.getInitialState({
  loadingAuthors: "IDLE", // "IDLE" | "PENDING" | "SUCCEDED" | "FAILED"
  loadingAuthor: "IDLE", // "IDLE" | "PENDING" | "SUCCEDED" | "FAILED"
}) as EntityState<AuthorType> & initialStateType;

// THUNKS
export const getAuthors = createAsyncThunk<AuthorResponsePayload | AxiosError>(
  "/authors/getAuthors",
  async () => {
    try {
      const { data } = await axiosInstance.get(
        "/authors?includeCreatedNotes=true"
      );
      return data as AuthorResponsePayload;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const getAuthor = createAsyncThunk<
  AuthorResponsePayload | AxiosError,
  string | undefined
>("authors/getAuthor", async (id) => {
  try {
    const { data } = await axiosInstance.get(
      `/authors/${id}?includeCreatedNotes=true`
    );
    return data as AuthorResponsePayload;
  } catch (error) {
    return error as AxiosError;
  }
});

export const deleteAuthor = createAsyncThunk<
  AuthorResponsePayload | AxiosError,
  string | undefined
>("/authors/deleteAuthor", async (id) => {
  try {
    const { data } = await axiosInstance.delete(
      `/authors/delete/${id}?deleteProfile=true`
    );
    return data as AuthorResponsePayload;
  } catch (error) {
    return error as AxiosError;
  }
});

export const updateAuthor = createAsyncThunk<
  AuthorResponsePayload | AxiosError,
  AuthorUpdateType
>("/authors/updateAuthor", async (mutableBody) => {
  try {
    const { data } = await axiosInstance.patch(
      `/authors/update/${mutableBody.id}?includeCreatedNotes=true`,

      mutableBody
    );
    return data as AuthorResponsePayload;
  } catch (error) {
    return error as AxiosError;
  }
});

const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAuthors.pending, (state, action) => {
        authorsAdapter.removeAll(state);
        state.loadingAuthors = "PENDING";
      })
      .addCase(getAuthors.fulfilled, (state, action) => {
        const { authors } = action.payload as AuthorResponsePayload;
        if (authors) {
          authors?.map((author) => {
            author.id = author.author_uid;
            delete author.author_uid;
            return author;
          });
          authorsAdapter.upsertMany(state, authors as AuthorType[]);
          state.loadingAuthors = "SUCCEDED";
        } else {
          state.loadingAuthors = "FAILED";
        }
      })
      .addCase(getAuthors.rejected, (state, action) => {
        authorsAdapter.removeAll(state);
        state.loadingAuthors = "FAILED";
      })
      .addCase(getAuthor.pending, (state, action) => {
        state.loadingAuthor = "PENDING";
      })
      .addCase(getAuthor.fulfilled, (state, action) => {
        const { author } = action.payload as AuthorResponsePayload;
        if (author) {
          author.id = author.author_uid;
          delete author.author_uid;
          authorsAdapter.addOne(state, author as AuthorType);
          state.loadingAuthor = "SUCCEDED";
          window.location.href = "/home";
        } else {
          state.loadingAuthor = "FAILED";
        }
      })
      .addCase(getAuthor.rejected, (state, action) => {
        state.loadingAuthor = "FAILED";
      })
      .addCase(deleteAuthor.pending, (state, action) => {
        state.loadingAuthor = "PENDING";
      })
      .addCase(deleteAuthor.fulfilled, (state, action) => {
        const { author } = action.payload as AuthorResponsePayload;
        const { id } = author as AuthorType;
        authorsAdapter.removeOne(state, id as string);
        state.loadingAuthor = "SUCCEDED";
        window.location.href = `${siteUrl}`;
      })
      .addCase(deleteAuthor.rejected, (state, action) => {
        state.loadingAuthor = "FAILED";
      })
      .addCase(updateAuthor.pending, (state, action) => {
        state.loadingAuthor = "PENDING";
      })
      .addCase(updateAuthor.fulfilled, (state, action) => {
        const { author } = action.payload as AuthorResponsePayload;
        authorsAdapter.updateOne(state, {
          id: author.author_uid,
          changes: author,
        });
        state.loadingAuthor = "SUCCEDED";
      })
      .addCase(updateAuthor.rejected, (state, action) => {
        state.loadingAuthor = "FAILED";
      });
  },
});

// SELECTORS
export const {
  selectAll: selectAllAuthors,
  selectById: selectAuthorById,
  selectIds: selectAuthorIds,
} = authorsAdapter.getSelectors<State>((state) => state.authors);

// LOADING SELECTORS
export const selectLoadingAuthors = (state: State) =>
  state.authors.loadingAuthors;
export const selectLoadingAuthor = (state: State) =>
  state.authors.loadingAuthor;

// REDUCER
export default authorsSlice.reducer;
