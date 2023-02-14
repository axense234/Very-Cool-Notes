// Redux Toolkit
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
// AXIOS
import { AxiosError } from "axios";
import axiosInstance from "../../utils/axios";
// REDUX STORE
import { State } from "../api/store";
// TS
import { FolderType, FolderResponsePayload } from "../../types";

const foldersAdapter = createEntityAdapter<FolderType>({
  sortComparer: (a, b) => a.label.localeCompare(b.label),
});

type initialStateType = {
  loadingFolders: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingFolder: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
};

const initialState = foldersAdapter.getInitialState({
  loadingFolders: "IDLE", // "IDLE" | "PENDING" | "SUCCEDED" | "FAILED",
  loadingFolder: "IDLE", // "IDLE" | "PENDING" | "SUCCEDED" | "FAILED"
}) as EntityState<FolderType> & initialStateType;

// THUNKS
export const getAllFolders = createAsyncThunk<
  FolderResponsePayload | AxiosError,
  string
>("folders/getAllFolders", async (createdById) => {
  try {
    const { data } = await axiosInstance.get(
      `/folders?createdById=${createdById || undefined}`
    );
    return data as FolderResponsePayload;
  } catch (error) {
    return error as AxiosError;
  }
});

export const getFolderById = createAsyncThunk<
  FolderResponsePayload | AxiosError,
  string
>("folders/getFolderById", async (id) => {
  try {
    const { data } = await axiosInstance.get(`/folders/${id}`);
    return data as FolderResponsePayload;
  } catch (error) {
    return error as AxiosError;
  }
});

export const deleteFolderById = createAsyncThunk<
  FolderResponsePayload | AxiosError,
  string
>("folders/deleteFolder", async (id) => {
  try {
    const { data } = await axiosInstance.delete(`folders/delete/${id}`);
    return data as FolderResponsePayload;
  } catch (error) {
    return error as AxiosError;
  }
});

export const updateFolderById = createAsyncThunk<
  FolderResponsePayload | AxiosError,
  FolderType
>("folders/updateFolderById", async (mutableBody) => {
  try {
    const { data } = await axiosInstance.patch(
      `/folders/update/${mutableBody.folder_uid}`,
      mutableBody
    );
    return data as FolderResponsePayload;
  } catch (error) {
    return error as AxiosError;
  }
});

export const createFolder = createAsyncThunk<
  FolderResponsePayload | AxiosError,
  FolderType
>("folders/createFolder", async (mutableBody) => {
  try {
    const { data } = await axiosInstance.post(`folders/create`, mutableBody);
    return data as FolderResponsePayload;
  } catch (error) {
    return error as AxiosError;
  }
});

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllFolders.pending, (state, action) => {
        foldersAdapter.removeAll(state);
        state.loadingFolders = "PENDING";
      })
      .addCase(getAllFolders.fulfilled, (state, action) => {
        const { folders } = action.payload as FolderResponsePayload;
        if (folders) {
          folders.map((folder) => {
            folder.id = folder.folder_uid;
            return folder;
          });
          foldersAdapter.upsertMany(state, folders as FolderType[]);
        }
        state.loadingFolders = "SUCCEDED";
      })
      .addCase(getAllFolders.rejected, (state, action) => {
        foldersAdapter.removeAll(state);
        state.loadingFolders = "FAILED";
      })
      .addCase(getFolderById.pending, (state, action) => {
        state.loadingFolder = "PENDING";
      })
      .addCase(getFolderById.fulfilled, (state, action) => {
        const { folder } = action.payload as FolderResponsePayload;
        foldersAdapter.upsertOne(state, folder as FolderType);
        state.loadingFolder = "SUCCEDED";
      })
      .addCase(getFolderById.rejected, (state, action) => {
        state.loadingFolder = "FAILED";
      })
      .addCase(deleteFolderById.pending, (state, action) => {
        state.loadingFolder = "PENDING";
      })
      .addCase(deleteFolderById.fulfilled, (state, action) => {
        const { folder } = action.payload as FolderResponsePayload;
        const { folder_uid } = folder as FolderType;
        foldersAdapter.removeOne(state, folder_uid as string);
        state.loadingFolder = "SUCCEDED";
      })
      .addCase(deleteFolderById.rejected, (state, action) => {
        state.loadingFolder = "FAILED";
      })
      .addCase(updateFolderById.pending, (state, action) => {
        state.loadingFolder = "PENDING";
      })
      .addCase(updateFolderById.fulfilled, (state, action) => {
        const { folder } = action.payload as FolderResponsePayload;
        foldersAdapter.updateOne(state, {
          id: folder.folder_uid,
          changes: { label: folder.label },
        });
        state.loadingFolder = "SUCCEDED";
      })
      .addCase(updateFolderById.rejected, (state, action) => {
        state.loadingFolder = "FAILED";
      })
      .addCase(createFolder.pending, (state, action) => {
        state.loadingFolder = "PENDING";
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        const { folder } = action.payload as FolderResponsePayload;
        if (folder) {
          folder.id = folder.folder_uid;
          foldersAdapter.upsertOne(state, folder as FolderType);
        }
        state.loadingFolder = "SUCCEDED";
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.loadingFolder = "FAILED";
      });
  },
});

// SELECTORS
export const {
  selectAll: selectAllFolders,
  selectById: selectFolderById,
  selectIds: selectFolderIds,
} = foldersAdapter.getSelectors((state: State) => state.folders);

// LOADING SELECTORS
export const selectLoadingFolders = (state: State) =>
  state.folders.loadingFolders;
export const selectLoadingFolder = (state: State) =>
  state.folders.loadingFolder;

// REDUCER
export default foldersSlice.reducer;
