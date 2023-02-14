// React
import { useEffect } from "react";
// SCSS
import "../scss/components/Gallery/Gallery.scss";
// Components
import TempTitlePage from "../components/Other/TempTitlePage";
import GalleryOptions from "../components/Gallery/GalleryOptions";
import GalleryFolders from "../components/Gallery/GalleryFolders";
import GalleryNotes from "../components/Gallery/GalleryNotes";
import OverlayModal from "../components/Modals/OverlayModal";
// Redux
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { selectProfile } from "../redux/slices/generalSlice";
import {
  getAllFolders,
  selectAllFolders,
  selectLoadingFolders,
} from "../redux/slices/foldersSlice";
import { getNotes, selectLoadingNotes } from "../redux/slices/notesSlice";

const Gallery: React.FC = () => {
  const dispatch = useAppDispatch();
  const loadingFoldersState = useAppSelector(selectLoadingFolders);
  const loadingNotesState = useAppSelector(selectLoadingNotes);
  const profile = useAppSelector(selectProfile);
  const folders = useAppSelector(selectAllFolders);

  useEffect(() => {
    if (loadingFoldersState === "IDLE" && profile.id) {
      dispatch(getAllFolders(profile.id as string));
    }
  }, [loadingFoldersState, dispatch, profile.id]);

  useEffect(() => {
    if (loadingNotesState === "IDLE" && profile.id) {
      dispatch(getNotes({ title: "", createdById: profile.id as string }));
    }
  }, [dispatch, loadingNotesState, profile.id]);

  return (
    <div className='gallery-container'>
      <TempTitlePage compWidth='40%' title='Gallery' />
      <main className='gallery-container__content'>
        <GalleryOptions />
        <GalleryFolders />
        <GalleryNotes />
        <OverlayModal timer={10} />
      </main>
    </div>
  );
};

export default Gallery;
