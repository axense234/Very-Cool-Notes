// React
import { useState } from "react";
// SCSS
import "../../scss/components/Gallery/Folder.scss";
// React Icons
import { FcFolder } from "react-icons/fc";
import { FaWindowClose } from "react-icons/fa";
// Components
import FolderModal from "../Modals/FolderModal";
import LabelFolderModal from "./LabelFolderModal";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  selectSelectedFolder,
  selectShowLabelFolderModal,
  selectShowOverlay,
  setOverlayModalFunctionOnConfirmation,
  setOverlayModalMessage,
  setSelectedFolder,
  setSelectedShownFolder,
  setShowLabelFolderModal,
  setShowOverlay,
} from "../../redux/slices/generalSlice";
import { selectFolderById } from "../../redux/slices/foldersSlice";
import { State } from "../../redux/api/store";

interface FolderProps {
  id: string;
}

const Folder: React.FC<FolderProps> = ({ id }) => {
  const [showDeleteFolderModal, setShowDeleteFolderModal] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();
  const folderModal = useAppSelector(selectSelectedFolder);

  const showLabelFolderModal = useAppSelector(selectShowLabelFolderModal);
  const showOverlay = useAppSelector(selectShowOverlay);

  const folder = useAppSelector((state: State) => selectFolderById(state, id));

  const handleOnDeleteFolderClick = () => {
    dispatch(setSelectedFolder(id as string));
    dispatch(setShowOverlay(true));
    dispatch(setOverlayModalFunctionOnConfirmation("deleteFolder"));
    dispatch(
      setOverlayModalMessage("Are you sure you want to delete the folder?")
    );
  };

  return (
    <li
      className='folder-container'
      onClick={() => {
        if (showLabelFolderModal !== id) {
          dispatch(setShowLabelFolderModal(id));
        }
        setShowDeleteFolderModal(false);
        dispatch(setSelectedShownFolder(id));
      }}
      onMouseEnter={() => {
        setShowDeleteFolderModal(true);
        dispatch(setSelectedFolder(id));
      }}
      onMouseLeave={() => {
        setShowDeleteFolderModal(false);
        if (!showOverlay) dispatch(setSelectedFolder("home"));
      }}
      style={{
        zIndex:
          folderModal === id || showLabelFolderModal === id ? "5" : "initial",
      }}
    >
      <FcFolder className='folder-container__icon' />
      <p>{folder?.label}</p>
      {showDeleteFolderModal && showLabelFolderModal !== id && (
        <FaWindowClose
          className='delete-folder-modal'
          onClick={() => handleOnDeleteFolderClick()}
        />
      )}
      <FolderModal folderId={id} />
      <LabelFolderModal folderId={id} />
    </li>
  );
};

export default Folder;
