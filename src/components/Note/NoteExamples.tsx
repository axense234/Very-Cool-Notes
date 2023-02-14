// React
import { useEffect } from "react";
// React Router
import { Link } from "react-router-dom";
// Components
import Note from ".";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { selectProfile } from "../../redux/slices/generalSlice";
import {
  getNotes,
  selectAllNotes,
  selectLoadingNotes,
} from "../../redux/slices/notesSlice";

const NoteExamples: React.FC = () => {
  const dispatch = useAppDispatch();
  const loadingNotesState = useAppSelector(selectLoadingNotes);
  const profile = useAppSelector(selectProfile);
  const notes = useAppSelector(selectAllNotes);

  useEffect(() => {
    if (loadingNotesState === "IDLE" && profile.id) {
      dispatch(getNotes({ title: "", createdById: profile.id }));
    }
  }, [dispatch, loadingNotesState, profile.id]);

  return (
    <ul className='note-examples-container'>
      {notes.length >= 1 ? (
        notes.slice(0, 3).map((note) => {
          return (
            <Note
              id={note.id as string}
              lineHeight={70}
              maxChars={200}
              key={note.id}
              displayMode
            />
          );
        })
      ) : (
        <p>
          No notes found,but you can create one{" "}
          <Link to='/notes/create'>here</Link>
        </p>
      )}
    </ul>
  );
};

export default NoteExamples;
