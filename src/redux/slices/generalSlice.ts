// Redux Toolkit
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// AXIOS
import axios, { AxiosError } from "axios";
import axiosInstance from "../../utils/axios";
// Config
import { siteUrl } from "../../config";
// TS
import {
  AuthorType,
  AuthorResponsePayload,
  LoginResponsePayload,
  ModalType,
  NoteOptionObject,
  NoteOptionObjectProp,
  WriteNoteContent,
  NoteType,
  StyleOptionsType,
  typeOfContentType,
  OverlayModalFunctionReceivedType,
  FolderType,
  AddNoteToFolder,
  getAllNotesParamsType,
} from "../../types";
// STORE STATE
import { State } from "../api/store";

type initialStateType = {
  loadingProfile: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  authFormModal: ModalType;
  profile: AuthorType;
  noteOptions: NoteOptionObject;
  defaultNoteContent: WriteNoteContent;
  typeOfContent: typeOfContentType;
  showOverlay: boolean;
  overlayModalFunctionOnConfirmation: OverlayModalFunctionReceivedType;
  overlayModalMessage: string;
  showCreateFolderModal: boolean;
  createFolderContent: FolderType;
  toggles: {
    folders: boolean;
    folderNotes: boolean;
  };
  selectedFolder: string;
  showNoteModal: string;
  showNoteModalMenu: string;
  noteToBeDeleted: string;
  noteToFolder: AddNoteToFolder;
  folderLabel: string;
  showLabelFolderModal: string;
  selectedShownFolder: string;
  editMode: boolean;
  galleryPage: boolean;
  searchResultsQuery: getAllNotesParamsType;
};

const initialState = {
  // Loading Profile State
  loadingProfile: "IDLE",
  // Auth Form Modal
  authFormModal: {
    show: false,
    msg: "",
  },
  // Default Profile
  profile: {
    author_uid: "",
    id: "",
    email: "",
    password: "",
    favoritedNotes: [],
    createdNotes: [],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1673720375/Very%20Cool%20Notes%20MERN%20Project/default_profile_logo_kwmypo.webp",
    username: "Default Username",
  },
  // Default Note Options
  noteOptions: {
    backgroundColor: "#e0c9a6",
    fontSize: "16px",
    textColor: "black",
    fontFamily: "Poppins",
    titleColor: "black",
    titleFontSize: "16px",
  },
  // Default Note Content
  defaultNoteContent: {
    content:
      "Type something in the Note Content and it will be displayed here!",
    title: "Write a Note",
    authorName: "You",
    createdById: "",
    note_uid: "",
    styleOptions: {
      backgroundColor: "#e0c9a6",
      fontSize: "16px",
      textColor: "black",
      fontFamily: "Poppins",
      titleColor: "black",
      titleFontSize: "16px",
    },
  },
  // Type of content in Profile
  typeOfContent: "notes",
  // Overlay Modal
  showOverlay: false,
  overlayModalFunctionOnConfirmation: "signout",
  overlayModalMessage: "No message?",
  // Create Folder Modal
  showCreateFolderModal: false,
  createFolderContent: {
    label: "",
    author_uid: "",
  },
  // Toggles
  toggles: {
    folders: true,
    folderNotes: true,
  },
  // Selected Folder(the delete folder modal and the folder's notes modal rely on this)
  selectedFolder: "home",
  // Note Modal
  showNoteModal: "",
  showNoteModalMenu: "",
  // Note to be deleted
  noteToBeDeleted: "",
  // Note to Folder
  noteToFolder: {
    folder_uid: "home",
    note_uid: "",
  },
  // Folder label
  folderLabel: "",
  // Folder label modal
  showLabelFolderModal: "home",
  // Selected Shown Folder
  selectedShownFolder: "home",
  // Edit Mode for Profile Details Used
  editMode: false,
  // Gallery Page
  galleryPage: false,
  // Search Results query
  searchResultsQuery: {
    createdById: "",
    title: "",
  },
} as initialStateType;

export const createAuthor = createAsyncThunk<
  AuthorResponsePayload | AxiosError,
  AuthorType
>("/authors/createAuthor", async (mutableBody) => {
  try {
    console.log("try me", mutableBody);
    mutableBody.username = mutableBody.email;
    const { data } = await axiosInstance.post("/authors/signup", mutableBody);
    console.log(data, "data received");
    return data as AuthorResponsePayload;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const loginAuthor = createAsyncThunk<
  AuthorResponsePayload | AxiosError,
  AuthorType
>("authors/loginAuthor", async (mutableBody) => {
  try {
    const { data } = await axiosInstance.post("/authors/login", mutableBody);
    return data as AuthorResponsePayload;
  } catch (error) {
    return error as AxiosError;
  }
});

export const getProfile = createAsyncThunk<AuthorResponsePayload | AxiosError>(
  "authors/getProfile",
  async () => {
    try {
      const { data } = await axiosInstance.get(
        `/authors/undefined?includeCreatedNotes=true&includeFolders=true`
      );
      return data as AuthorResponsePayload;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const signOut = createAsyncThunk<AuthorResponsePayload>(
  "authors/signout",
  async () => {
    const { data } = await axiosInstance.post(`/authors/signout`);
    return data as AuthorResponsePayload;
  }
);

export const createCloudinaryImage = createAsyncThunk(
  "general/createCloudinaryImaeg",
  async (imageFile: string | File) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "very-cool-notes");
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/birthdayreminder/image/upload",
        formData
      );
      return data.secure_url;
    } catch (error) {
      return error;
    }
  }
);

const generalSlice = createSlice({
  name: "generals",
  initialState,
  reducers: {
    updateAuthFormModal(state, action: PayloadAction<ModalType>) {
      state.authFormModal = action.payload;
    },
    updateNoteOptions(state, action: PayloadAction<NoteOptionObjectProp>) {
      state.noteOptions = {
        ...state.noteOptions,
        [action.payload.property]: action.payload.value,
      };
    },
    updateNoteContent(state, action: PayloadAction<NoteOptionObjectProp>) {
      state.defaultNoteContent = {
        ...state.defaultNoteContent,
        [action.payload.property]: action.payload.value,
      };
    },
    setNoteContent(state, action: PayloadAction<NoteType>) {
      state.defaultNoteContent = action.payload;
      state.noteOptions = action.payload.styleOptions as StyleOptionsType;
    },
    resetNoteSettings(state, action) {
      state.defaultNoteContent = {
        content:
          "Type something in the Note Content and it will be displayed here!",
        title: "Write a Note",
        authorName: "You",
        createdById: "",
        styleOptions: {
          backgroundColor: "#e0c9a6",
          fontSize: "16px",
          textColor: "black",
          fontFamily: "Poppins",
          titleColor: "black",
          titleFontSize: "16px",
        },
      };
      state.noteOptions = {
        backgroundColor: "#e0c9a6",
        fontSize: "16px",
        textColor: "black",
        fontFamily: "Poppins",
        titleColor: "black",
        titleFontSize: "16px",
      };
    },
    setTypeOfContent(state, action: PayloadAction<typeOfContentType>) {
      state.typeOfContent = action.payload;
    },
    setShowOverlay(state, action: PayloadAction<boolean>) {
      state.showOverlay = action.payload;
    },
    setOverlayModalFunctionOnConfirmation(
      state,
      action: PayloadAction<OverlayModalFunctionReceivedType>
    ) {
      state.overlayModalFunctionOnConfirmation = action.payload;
    },
    setOverlayModalMessage(state, action: PayloadAction<string>) {
      state.overlayModalMessage = action.payload;
    },
    setShowCreateFolderModal(state, action: PayloadAction<boolean>) {
      state.showCreateFolderModal = action.payload;
    },
    updateCreateFolderContent(
      state,
      action: PayloadAction<NoteOptionObjectProp>
    ) {
      state.createFolderContent = {
        ...state.createFolderContent,
        [action.payload.property]: action.payload.value,
      };
    },
    setToggle(state, action: PayloadAction<NoteOptionObjectProp>) {
      state.toggles = {
        ...state.toggles,
        [action.payload.property]: action.payload.value,
      };
    },
    setSelectedFolder(state, action: PayloadAction<string>) {
      state.selectedFolder = action.payload;
    },
    setShowNoteModal(state, action: PayloadAction<string>) {
      state.showNoteModal = action.payload;
    },
    setShowNoteModalMenu(state, action: PayloadAction<string>) {
      state.showNoteModalMenu = action.payload;
    },
    setNoteToBeDeleted(state, action: PayloadAction<string>) {
      state.noteToBeDeleted = action.payload;
    },
    addNoteToFolder(state, action: PayloadAction<NoteOptionObjectProp>) {
      state.noteToFolder = {
        ...state.noteToFolder,
        [action.payload.property]: action.payload.value,
      };
    },
    setFolderLabel(state, action: PayloadAction<string>) {
      state.folderLabel = action.payload;
    },
    setShowLabelFolderModal(state, action: PayloadAction<string>) {
      state.showLabelFolderModal = action.payload;
    },
    setSelectedShownFolder(state, action: PayloadAction<string>) {
      state.selectedShownFolder = action.payload;
    },
    setEditMode(state, action: PayloadAction<boolean>) {
      state.editMode = action.payload;
    },
    setProfileProperty(state, action: PayloadAction<NoteOptionObjectProp>) {
      state.profile = {
        ...state.profile,
        [action.payload.property]: action.payload.value,
      };
    },
    setSearchResultsQuery(state, action: PayloadAction<getAllNotesParamsType>) {
      state.searchResultsQuery.createdById = action.payload.createdById;
      state.searchResultsQuery.title = action.payload.title;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createAuthor.fulfilled, (state, action) => {
        const { author } = action.payload as AuthorResponsePayload;
        const { response } = action.payload as AxiosError;

        console.log(author, response);

        // EMAIL ALREADY EXISTS
        if (response && response.statusText === "Bad Request") {
          state.authFormModal = {
            msg: "Please provide an unique email address!",
            show: true,
          };
        }

        if (author) {
          author.id = author.author_uid;
          author.username = author.email;
          state.profile = author;
          window.location.href = "/home";
        }
      })

      .addCase(loginAuthor.fulfilled, (state, action) => {
        const { author } = action.payload as AuthorResponsePayload;
        const { response } = action.payload as AxiosError;
        // UNAUTHORIZED
        if (response && response.statusText === "Unauthorized") {
          const { msg } = response.data as LoginResponsePayload;
          state.authFormModal = {
            msg,
            show: true,
          };
          // NOT FOUND
        } else if (response && response.statusText === "Not Found") {
          const { msg } = response.data as LoginResponsePayload;
          state.authFormModal = {
            msg,
            show: true,
          };
          // BAD REQUEST
        } else if (response && response.statusText === "Bad Request") {
          const { msg } = response.data as LoginResponsePayload;
          state.authFormModal = {
            msg,
            show: true,
          };
        }

        if (author) {
          author.id = author.author_uid;
          state.profile = author;
          window.location.href = "/home";
        }
      })
      .addCase(getProfile.pending, (state, action) => {
        state.loadingProfile = "PENDING";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        const { author } = action.payload as AuthorResponsePayload;
        const { response } = action.payload as AxiosError;

        console.log(author, response);

        if (
          response &&
          response.status === 400 &&
          window.location.href !== `${siteUrl}/` &&
          window.location.href !== `${siteUrl}/signup`
        ) {
          window.location.href = "/";
        }

        if (author) {
          author.id = author.author_uid;
          state.profile = author;
        }

        state.loadingProfile = "SUCCEDED";
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loadingProfile = "FAILED";
      })
      .addCase(signOut.fulfilled, (state, action) => {
        window.location.href = `${siteUrl}`;
      })
      .addCase(createCloudinaryImage.fulfilled, (state, action) => {
        state.profile.imageUrl = action.payload;
      });
  },
});

// SELECTORS
export const selectAuthFormModal = (state: State) =>
  state.general.authFormModal;

export const selectProfile = (state: State) => state.general.profile;

export const selectLoadingProfile = (state: State) =>
  state.general.loadingProfile;

export const selectNoteOptions = (state: State) => state.general.noteOptions;

export const selectNoteContent = (state: State) =>
  state.general.defaultNoteContent;

export const selectTypeOfContent = (state: State) =>
  state.general.typeOfContent;

export const selectShowOverlay = (state: State) => state.general.showOverlay;

export const selectOverlayModalFunctionOnConfirmation = (state: State) =>
  state.general.overlayModalFunctionOnConfirmation;

export const selectOverlayModalMessage = (state: State) =>
  state.general.overlayModalMessage;

export const selectShowCreateFolderModal = (state: State) =>
  state.general.showCreateFolderModal;

export const selectCreateFolderContent = (state: State) =>
  state.general.createFolderContent;

export const selectToggles = (state: State) => state.general.toggles;

export const selectSelectedFolder = (state: State) =>
  state.general.selectedFolder;

export const selectShowNoteModal = (state: State) =>
  state.general.showNoteModal;

export const selectShowNoteModalMenu = (state: State) =>
  state.general.showNoteModalMenu;

export const selectNoteToBeDeleted = (state: State) =>
  state.general.noteToBeDeleted;

export const selectNoteToFolder = (state: State) => state.general.noteToFolder;

export const selectFolderLabel = (state: State) => state.general.folderLabel;

export const selectShowLabelFolderModal = (state: State) =>
  state.general.showLabelFolderModal;

export const selectSelectedShownFolder = (state: State) =>
  state.general.selectedShownFolder;

export const selectEditMode = (state: State) => state.general.editMode;

export const selectSearchResultsQuery = (state: State) =>
  state.general.searchResultsQuery;

// ACTIONS
export const {
  updateAuthFormModal,
  updateNoteOptions,
  updateNoteContent,
  resetNoteSettings,
  setNoteContent,
  setTypeOfContent,
  setShowOverlay,
  setOverlayModalFunctionOnConfirmation,
  setOverlayModalMessage,
  setShowCreateFolderModal,
  updateCreateFolderContent,
  setToggle,
  setSelectedFolder,
  setShowNoteModal,
  setShowNoteModalMenu,
  setNoteToBeDeleted,
  addNoteToFolder,
  setFolderLabel,
  setShowLabelFolderModal,
  setSelectedShownFolder,
  setEditMode,
  setProfileProperty,
  setSearchResultsQuery,
} = generalSlice.actions;

// REDUCER
export default generalSlice.reducer;
