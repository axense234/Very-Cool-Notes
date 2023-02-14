// React
import { useRef } from "react";
// SCSS
import "../../scss/components/Modals/FolderModal.scss";
// React Router
import { Link } from "react-router-dom";
// Redux
import { useAppSelector } from "../../hooks/redux";
import useModalTransition from "../../hooks/useModalTransition";
import { selectAllNotes } from "../../redux/slices/notesSlice";
import {
  selectSelectedFolder,
  selectShowLabelFolderModal,
} from "../../redux/slices/generalSlice";

interface FolderModalProps {
  folderId: string;
}

const FolderModal: React.FC<FolderModalProps> = ({ folderId }) => {
  const folderModalRef = useRef<HTMLDivElement>(null);

  const profileNotes = useAppSelector(selectAllNotes);
  const selectedFolder = useAppSelector(selectSelectedFolder);
  const showLabelFolderModal = useAppSelector(selectShowLabelFolderModal);

  const notes = profileNotes.filter(
    (profileNote) => profileNote.folder_uid === selectedFolder
  );

  const showFolderModal =
    folderId === selectedFolder && folderId !== showLabelFolderModal;

  useModalTransition(folderModalRef, showFolderModal);

  return (
    <div className='folder-modal-container' ref={folderModalRef}>
      <ul className='folder-modal-container__titles'>
        {notes.length >= 1 ? (
          notes.map((note) => {
            return (
              <li key={note.note_uid}>
                <Link to={`/notes/${note.note_uid}`}>{note.title}</Link>
              </li>
            );
          })
        ) : (
          <li>Folder has no notes.</li>
        )}
      </ul>
    </div>
  );
};

export default FolderModal;
