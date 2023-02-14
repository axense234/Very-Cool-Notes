// SCSS
import "../../scss/components/Modals/CreateFolderModal.scss";
// React Icons
import { AiOutlineClose } from "react-icons/ai";
// React
import { useEffect, useRef } from "react";
// Hooks
import useModalTransition from "../../hooks/useModalTransition";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  selectCreateFolderContent,
  selectProfile,
  selectShowCreateFolderModal,
  setShowCreateFolderModal,
  updateCreateFolderContent,
} from "../../redux/slices/generalSlice";
import { createFolder } from "../../redux/slices/foldersSlice";

const CreateFolderModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const showCreateFolderModal = useAppSelector(selectShowCreateFolderModal);
  const createFolderContent = useAppSelector(selectCreateFolderContent);

  const createFolderModalRef = useRef<HTMLDivElement>(null);

  const handleOnFolderLabelChange = (label: string) => {
    dispatch(updateCreateFolderContent({ property: "label", value: label }));
  };

  useModalTransition(createFolderModalRef, showCreateFolderModal);

  const handleCreateFolderSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(createFolder(createFolderContent));
    dispatch(updateCreateFolderContent({ property: "label", value: "" }));
    dispatch(setShowCreateFolderModal(false));
  };

  useEffect(() => {
    dispatch(
      updateCreateFolderContent({
        property: "author_uid",
        value: profile.id as string,
      })
    );
  }, []);

  return (
    <div className='create-folder-modal-container' ref={createFolderModalRef}>
      <AiOutlineClose
        onClick={() => dispatch(setShowCreateFolderModal(false))}
        id='create-folder-modal'
      />
      <h3>Create Folder</h3>
      <form
        className='create-folder-modal-container__form'
        onSubmit={(e) => handleCreateFolderSubmit(e)}
      >
        <label htmlFor='folderLabel'>Folder Name:</label>
        <input
          type='text'
          name='folderLabel'
          id='folderLabel'
          required
          minLength={4}
          maxLength={13}
          value={createFolderContent.label}
          onChange={(e) => handleOnFolderLabelChange(e.target.value)}
        />
      </form>
    </div>
  );
};

export default CreateFolderModal;
