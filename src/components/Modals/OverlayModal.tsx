// React
import { useEffect, useRef, useState } from "react";
// SCSS
import "../../scss/components/Modals/OverlayModal.scss";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { deleteAuthor } from "../../redux/slices/authorsSlice";
import {
  selectNoteToBeDeleted,
  selectOverlayModalFunctionOnConfirmation,
  selectOverlayModalMessage,
  selectProfile,
  selectSelectedFolder,
  selectShowOverlay,
  setNoteToBeDeleted,
  setSelectedFolder,
  setSelectedShownFolder,
  setShowOverlay,
  signOut,
} from "../../redux/slices/generalSlice";
import { deleteNoteById } from "../../redux/slices/notesSlice";
import { deleteFolderById } from "../../redux/slices/foldersSlice";

interface OverlayModalProps {
  timer: number;
}

const OverlayModal: React.FC<OverlayModalProps> = ({ timer }) => {
  const dispatch = useAppDispatch();
  const overlayModalFunctionOnConfirmation = useAppSelector(
    selectOverlayModalFunctionOnConfirmation
  );
  const overlayModalRef = useRef<HTMLDivElement>(null);
  const showOverlay = useAppSelector(selectShowOverlay);
  const message = useAppSelector(selectOverlayModalMessage);

  const profile = useAppSelector(selectProfile);

  const noteToBeDeleted = useAppSelector(selectNoteToBeDeleted);
  const folderToBeDeleted = useAppSelector(selectSelectedFolder);

  const handleOnOverlayModalConfirmation = () => {
    switch (overlayModalFunctionOnConfirmation) {
      case "deleteAccount":
        dispatch(deleteAuthor(profile.id));
        break;
      case "signout":
        dispatch(signOut());
        break;
      case "deleteNote":
        dispatch(deleteNoteById(noteToBeDeleted));
        dispatch(setShowOverlay(false));
        dispatch(setNoteToBeDeleted(""));
        break;
      case "deleteFolder":
        dispatch(deleteFolderById(folderToBeDeleted));
        dispatch(setShowOverlay(false));
        dispatch(setSelectedFolder("home"));
        dispatch(setSelectedShownFolder("home"));
        break;
      default:
        throw new Error("Invalid overlay on confirmation function.");
    }
  };

  const countdown = useCountdown(timer, showOverlay);

  useOverlayTransition(overlayModalRef, showOverlay);

  return (
    <div className='overlay-modal-container' ref={overlayModalRef}>
      <div className='overlay-modal-container__modal'>
        <p>{message}</p>
        <div className='overlay-modal-container__buttons'>
          <button type='button' onClick={() => dispatch(setShowOverlay(false))}>
            No
          </button>
          <button
            type='button'
            disabled={countdown > 0}
            onClick={() => handleOnOverlayModalConfirmation()}
          >
            {countdown > 0 ? countdown : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

const useOverlayTransition = (
  overlayModalRef: React.RefObject<HTMLDivElement>,
  showOverlay: boolean
) => {
  useEffect(() => {
    const modal = overlayModalRef.current as HTMLDivElement;
    let timeout: NodeJS.Timeout;

    if (showOverlay) {
      modal.style.display = "flex";
      timeout = setTimeout(() => {
        modal.style.transform = "scale(1)";
        modal.style.opacity = "1";
      }, 300);
    } else {
      modal.style.transform = "scale(0)";
      modal.style.opacity = "0";
      timeout = setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showOverlay]);
};

const useCountdown = (timer: number, showOverlay: boolean) => {
  const [countdown, setCountdown] = useState<number>(timer);

  useEffect(() => {
    setCountdown(timer);
  }, [showOverlay]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (countdown !== 0) {
      timeout = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [countdown]);

  return countdown;
};

export default OverlayModal;
