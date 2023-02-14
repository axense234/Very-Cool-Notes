// React
import { useEffect, useState } from "react";
// React Router
import { useParams } from "react-router-dom";
// Hooks
import useCheckWindowWidth from "../../hooks/useCheckWindowWidth";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getNoteById, selectLoadingNote } from "../../redux/slices/notesSlice";
// TS
import { TempNotePageProps } from "../../types";
// Components
import TempTitlePage from "../Other/TempTitlePage";
import TempIndNote from "./TempIndNote";
import TempNoteContent from "./TempNoteContent";
import TempOptions from "./TempOptions";

const TempNotePage: React.FC<TempNotePageProps> = ({ type }) => {
  const { noteId } = useParams();
  const dispatch = useAppDispatch();
  const loadingNoteState = useAppSelector(selectLoadingNote);

  const changeLayout = useCheckWindowWidth(1440);
  const tempTitleCompWidth = changeLayout ? "100%" : "45%";

  useEffect(() => {
    if (loadingNoteState === "IDLE" && type !== "write") {
      dispatch(getNoteById(noteId as string));
    }
  }, [dispatch, loadingNoteState, noteId]);

  if (type === "view") {
    return !changeLayout ? (
      <div className='note-page-container'>
        <TempTitlePage compWidth={tempTitleCompWidth} title='View Note' />
        <main className='note-page-container__content'>
          <TempOptions noteId={noteId as string} type={type} />
          <TempIndNote
            id={noteId as string}
            lineHeight={100}
            maxChars={10000}
            type={type}
          />
        </main>
      </div>
    ) : (
      <div className='note-page-container'>
        <TempTitlePage compWidth={tempTitleCompWidth} title='View Note' />
        <main className='note-page-container__content'>
          <TempIndNote
            id={noteId as string}
            lineHeight={100}
            maxChars={10000}
            type={type}
          />
          <TempOptions noteId={noteId as string} type={type} />
        </main>
      </div>
    );
  }

  return (
    <div className='note-page-container'>
      <TempTitlePage
        compWidth={tempTitleCompWidth}
        title={type === "write" ? "Write Note" : "Update Note"}
      />
      {!changeLayout ? (
        <main className='note-page-container__content'>
          <section className='note-page-container__settings'>
            <TempNoteContent type={type} noteId={noteId} />
            <TempOptions noteId={noteId as string} type={type} />
          </section>
          <TempIndNote
            id={noteId as string}
            lineHeight={100}
            maxChars={10000}
            type={type}
          />
        </main>
      ) : (
        <main className='note-page-container__content'>
          <TempIndNote
            id={noteId as string}
            lineHeight={100}
            maxChars={10000}
            type={type}
          />
          <section className='note-page-container__settings'>
            <TempNoteContent type={type} noteId={noteId} />
            <TempOptions noteId={noteId as string} type={type} />
          </section>
        </main>
      )}
    </div>
  );
};

export default TempNotePage;
