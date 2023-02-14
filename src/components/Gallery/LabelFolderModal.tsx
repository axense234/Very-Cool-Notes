// React
import { useRef } from "react";
// React Icons
import { AiOutlineClose } from "react-icons/ai";
// SCSS
import "../../scss/components/Modals/LabelFolderModal.scss";
// Hooks
import useModalTransition from "../../hooks/useModalTransition";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updateFolderById } from "../../redux/slices/foldersSlice";
import {
  selectFolderLabel,
  selectProfile,
  selectShowLabelFolderModal,
  setFolderLabel,
  setShowLabelFolderModal,
} from "../../redux/slices/generalSlice";

interface LabelFolderModalProps {
  folderId: string;
}

const LabelFolderModal: React.FC<LabelFolderModalProps> = ({ folderId }) => {
  const labelFolderModalRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const selectedFolderLabel = useAppSelector(selectFolderLabel);
  const selectedFolder = useAppSelector(selectShowLabelFolderModal);

  const { id } = useAppSelector(selectProfile);

  const showLabelFolderModal = selectedFolder === folderId;

  useModalTransition(labelFolderModalRef, showLabelFolderModal);

  const handleFolderLabelUpdateSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      updateFolderById({
        label: selectedFolderLabel,
        author_uid: id as string,
        folder_uid: selectedFolder,
      })
    );
    dispatch(setFolderLabel(""));
  };

  return (
    <div className='label-folder-modal-container' ref={labelFolderModalRef}>
      <AiOutlineClose
        onClick={() => {
          dispatch(setShowLabelFolderModal("home"));
        }}
      />
      <form
        className='label-folder-modal-container__form'
        onSubmit={(e) => handleFolderLabelUpdateSubmit(e)}
      >
        <label htmlFor='folderLabel'>Folder Label:</label>
        <input
          type='text'
          name='folderLabel'
          id='folderLabel'
          value={selectedFolderLabel}
          minLength={3}
          maxLength={13}
          onChange={(e) => dispatch(setFolderLabel(e.target.value as string))}
        />
        <button type='submit'>Change Label</button>
      </form>
    </div>
  );
};

export default LabelFolderModal;
