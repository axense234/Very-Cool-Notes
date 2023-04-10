// Redux Toolkit,Axios and React Types
import {
  EntityId,
  AsyncThunkAction,
  AsyncThunkConfig,
  Dispatch,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { MouseEventHandler } from "react";

interface TempProfileProps {
  type: "individual-author" | "profile";
  id?: string;
}

type typeOfContentType = "settings" | "notes" | "favoriteNotes";

interface RenderedContentProps {
  typeOfContent: typeOfContentType;
  typeOfPage: "individual-author" | "profile";
}

interface TempNotePageProps {
  type: "write" | "view" | "update";
  noteId?: string;
}

interface Auth {
  type: string;
}

interface Title {
  compWidth: string;
  title: string;
}

type ProfileOption = {
  id: number;
  name: string;
  label: string;
  overlayModalMessage?: string;
};

type FilterByOption = {
  id: number;
  value: string;
  label: string;
};

type Setting = {
  id: number;
  name: string;
};

type onChangePayload = {
  email?: string;
  password?: string;
  key: string;
};

type AboutLogoImage = {
  id: number;
  imageUrl: string;
  destinationUrl: string;
};

type AboutSection = {
  id: number;
  textContent: string;
  images: AboutLogoImage[];
};

type NoteOption = {
  id: number;
  label: string;
  options: string[];
  usedRule: string;
};

type WriteNoteContent = {
  content: string;
  title: string;
  authorName: string;
  createdById: string;
  styleOptions?: StyleOptionsType;
  note_uid?: string;
  createdAt?: string;
};

type NoteOptionObject = {
  backgroundColor: string;
  fontSize: string;
  fontFamily: string;
  textColor: string;
  titleColor: string;
  titleFontSize: string;
};

type NoteOptionObjectProp = {
  property: string;
  value: string | NoteOption[] | StyleOptionsType | boolean;
};

type FolderType = {
  folder_uid?: string;
  id?: string;
  label: string;
  notes?: Note[];
  author_uid: string;
};

type CategoryType = {
  category_uid: string;
  name: string;
  notes: Note[];
};

type NoteType = {
  id?: EntityId;
  note_uid?: string;
  title: string;
  content: string;
  categories?: Category[];

  folder_uid?: string;

  authorName: string;
  createdById: string;
  favoritedBy?: Author[];

  styleOptions?: StyleOptionsType;
  styleOptions_uid?: string;

  createdAt?: string;
  updatedAt?: string;
};

type NoteUpdateType = {
  id?: EntityId;
  note_uid?: string;
  title?: string;
  content?: string;
  categories?: Category[];

  folder_uid?: string | null;

  authorName?: string;
  createdById?: string;
  favoritedBy?: Author[];

  styleOptions?: StyleOptionsType;
  styleOptions_uid?: string;

  createdAt?: string;
  updatedAt?: string;
};

type StyleOptionsType = {
  backgroundColor: string;
  fontSize: string;
  fontFamily: string;
  textColor: string;
  titleColor: string;
  titleFontSize: string;
};

type filterByType = "content" | "createdAt" | "title";

interface NoteProps {
  id: EntityId;
  lineHeight: number;
  maxChars: number;
  type?: "update" | "write" | "view";
  displayMode?: boolean;
}

type AuthorType = {
  author_uid?: string;
  id?: string;
  imageUrl?: string;
  username: string;
  password: string;
  email: string;
  createdNotes?: Note[];
  favoritedNotes?: Note[];

  folders?: FolderType[];

  createdAt?: string;
  updatedAt?: string;
};

type AuthorUpdateType = {
  author_uid?: string;
  id?: string;
  imageUrl?: string;
  username?: string;
  password?: string;
  email?: string;
  createdNotes?: Note[];
  favoritedNotes?: Note[];

  folders?: FolderType[];

  createdAt?: string;
  updatedAt?: string;
};

type NoteResponsePayload = {
  msg: string;
  nbHits?: number;
  note?: Note;
  notes?: Note[];
};

type AuthorResponsePayload = {
  msg: string;
  nbHits?: number;
  author?: Author;
  authors?: Author[];
};

type FolderResponsePayload = {
  msg: string;
  nbHits?: number;
  folder?: Folder;
  folders?: Folder[];
};

type CategoryResponsePayload = {
  msg: string;
  nbHits?: number;
  category?: Category;
  categories?: Category[];
};

type LoginResponsePayload = {
  msg: string;
  token?: string;
  author?: Author;
};

type ModalType = {
  msg?: string;
  show?: boolean;
};

type OverlayModalFunctionReceivedType =
  | "deleteAccount"
  | "deleteFolder"
  | "deleteNote"
  | "signout";

type AddNoteToFolder = {
  note_uid: string;
  folder_uid: string;
};

type getAllNotesParamsType = {
  createdById?: string;
  title?: string;
};

export {
  Auth,
  NoteProps,
  NoteType,
  NoteResponsePayload,
  AuthorType,
  AuthorResponsePayload,
  CategoryType,
  ModalType,
  onChangePayload,
  RenderedContentProps,
  TempProfileProps,
  Title,
  AboutLogoImage,
  AboutSection,
  NoteOption,
  ProfileOption,
  Setting,
  TempNotePageProps,
  FolderType,
  FolderResponsePayload,
  CategoryResponsePayload,
  LoginResponsePayload,
  FilterByOption,
  NoteOptionObject,
  filterByType,
  NoteOptionObjectProp,
  WriteNoteContent,
  StyleOptionsType,
  typeOfContentType,
  OverlayModalFunctionReceivedType,
  AddNoteToFolder,
  NoteUpdateType,
  AuthorUpdateType,
  getAllNotesParamsType,
};
