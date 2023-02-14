// React Router
import { Link, useLocation } from "react-router-dom";
// React
import { useRef } from "react";
// React Icons
import { BsThreeDotsVertical } from "react-icons/bs";
// SCSS
import "../../scss/components/Modals/NoteModal.scss";
// TS
import { OverlayModalFunctionReceivedType } from "../../types";
// Hooks
import useModalTransition from "../../hooks/useModalTransition";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addNoteToFolder,
  selectNoteToFolder,
  selectShowNoteModal,
  selectShowNoteModalMenu,
  setNoteToBeDeleted,
  setOverlayModalFunctionOnConfirmation,
  setOverlayModalMessage,
  setShowNoteModal,
  setShowOverlay,
} from "../../redux/slices/generalSlice";
import { selectAllFolders } from "../../redux/slices/foldersSlice";
import { updateNoteById } from "../../redux/slices/notesSlice";

interface NoteModalProps {
  id: string;
}

const NoteModalMenu: React.FC<NoteModalProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const noteModalMenuId = useAppSelector(selectShowNoteModalMenu);
  const { pathname } = useLocation();

  const isOnGalleryPage = pathname === "/gallery";
  const noteModalMenuRef = useRef<HTMLDivElement>(null);

  const showNoteModalMenu = noteModalMenuId === id && isOnGalleryPage;

  useModalTransition(noteModalMenuRef, showNoteModalMenu);

  return (
    <div className='note-modal-menu-container' ref={noteModalMenuRef}>
      <BsThreeDotsVertical
        onClick={() => {
          dispatch(setShowNoteModal(noteModalMenuId));
          dispatch(
            addNoteToFolder({ property: "note_uid", value: id as string })
          );
        }}
      />
      <NoteModal id={id} />
    </div>
  );
};

const NoteModal: React.FC<NoteModalProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const noteModalId = useAppSelector(selectShowNoteModal);
  const noteModalRef = useRef<HTMLDivElement>(null);
  const folders = useAppSelector(selectAllFolders);

  const showNoteModal = noteModalId === id;
  const selectedNoteToFolder = useAppSelector(selectNoteToFolder);

  useModalTransition(noteModalRef, showNoteModal);

  const activateOverlayModal = (
    label: OverlayModalFunctionReceivedType,
    message: string
  ) => {
    dispatch(setOverlayModalFunctionOnConfirmation(label));
    dispatch(setOverlayModalMessage(message));
    dispatch(setShowOverlay(true));
  };

  const handleAddNoteToFolderSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      updateNoteById({
        id: selectedNoteToFolder.note_uid as string,
        folder_uid:
          (selectedNoteToFolder.folder_uid as string) === "home"
            ? null
            : (selectedNoteToFolder.folder_uid as string),
      })
    );
    dispatch(setShowNoteModal(""));
  };

  return (
    <div className='note-modal-container' ref={noteModalRef}>
      <Link to={`/notes/${id}`}>View Note</Link>
      <Link to={`/notes/update/${id}`}>Update Note</Link>
      <button
        type='button'
        onClick={() => {
          dispatch(setNoteToBeDeleted(id as string));
          activateOverlayModal(
            "deleteNote",
            "Are you sure you want to delete this note?"
          );
        }}
      >
        Delete Note
      </button>
      <form
        className='addNoteToXFolder-form'
        onSubmit={(e) => handleAddNoteToFolderSubmit(e)}
      >
        <label htmlFor='addNoteToXFolder'>Add to Folder:</label>
        <select
          name='addNoteToXFolder'
          id='addNoteToXFolder'
          onChange={(e) => {
            dispatch(
              addNoteToFolder({ property: "folder_uid", value: e.target.value })
            );
          }}
        >
          <option value='home'>Home</option>
          {folders.map((folder) => {
            return (
              <option value={folder.folder_uid} key={folder.folder_uid}>
                {folder.label}
              </option>
            );
          })}
        </select>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};
export default NoteModalMenu;
