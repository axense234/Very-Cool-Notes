// React
import { useEffect } from "react";
// React Router
import { useNavigate } from "react-router-dom";
// TS
import { NoteType, TempNotePageProps } from "../../types";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { State } from "../../redux/api/store";
import {
  resetNoteSettings,
  selectNoteContent,
  selectNoteOptions,
  selectProfile,
  setNoteContent,
  updateNoteContent,
} from "../../redux/slices/generalSlice";
import {
  createNote,
  selectNoteById,
  updateNoteById,
} from "../../redux/slices/notesSlice";

const TempNoteContent: React.FC<TempNotePageProps> = ({ type, noteId }) => {
  const dispatch = useAppDispatch();
  const defaultNoteContent = useAppSelector(selectNoteContent);
  const profile = useAppSelector(selectProfile);
  const noteOptions = useAppSelector(selectNoteOptions);

  const noteByQuery = useAppSelector((state: State) =>
    selectNoteById(state, noteId as string)
  );
  const note = noteByQuery;
  const navigate = useNavigate();

  const onNoteTitleChange = (title: string) =>
    dispatch(updateNoteContent({ property: "title", value: title }));

  const onNoteContentChange = (content: string) =>
    dispatch(updateNoteContent({ property: "content", value: content }));

  const onNoteSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (type === "write") {
      dispatch(createNote(defaultNoteContent));
    } else if (type === "update") {
      dispatch(updateNoteById(defaultNoteContent));
      navigate(`/notes/${noteId as string}`);
    }
    dispatch(resetNoteSettings("reset"));
  };

  useEffect(() => {
    dispatch(
      updateNoteContent({
        property: "createdById",
        value: profile.id as string,
      })
    );
    if ((type === "update" || type === "view") && note) {
      dispatch(setNoteContent(note as NoteType));
    }
  }, [note]);

  useEffect(() => {
    dispatch(
      updateNoteContent({
        property: "styleOptions",
        value: noteOptions,
      })
    );
  }, [noteOptions]);

  return (
    <form
      className='note-page-container__text'
      onSubmit={(e) => onNoteSubmit(e)}
    >
      <div className='note-page-container__noteTitle'>
        <label htmlFor='noteTitle'>Note Title</label>
        <input
          type='text'
          name='noteTitle'
          id='noteTitle'
          value={defaultNoteContent.title}
          required
          minLength={3}
          maxLength={30}
          onChange={(e) => onNoteTitleChange(e.target.value)}
        />
      </div>
      <div className='note-page-container__noteContent'>
        <label htmlFor='noteContent'>Note Content</label>
        <textarea
          name='Note Content'
          id='noteContent'
          value={defaultNoteContent.content}
          minLength={100}
          maxLength={4000}
          required
          onChange={(e) => onNoteContentChange(e.target.value)}
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default TempNoteContent;
