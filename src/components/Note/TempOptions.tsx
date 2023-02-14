// React
import { useEffect } from "react";
// Data
import { noteOptions } from "../../data";
// TS
import { NoteType } from "../../types";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { State } from "../../redux/api/store";
import {
  selectProfile,
  setNoteContent,
  updateNoteContent,
  updateNoteOptions,
} from "../../redux/slices/generalSlice";
import { selectNoteById } from "../../redux/slices/notesSlice";

interface TempOptionsProps {
  noteId: string;
  type: string;
}

const TempOptions: React.FC<TempOptionsProps> = ({ noteId, type }) => {
  const dispatch = useAppDispatch();
  const handleNoteOptionChange = (property: string, value: string) => {
    dispatch(updateNoteOptions({ property, value }));
  };
  const profile = useAppSelector(selectProfile);
  const note = useAppSelector((state: State) => selectNoteById(state, noteId));

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
    <div className='note-page-container__options'>
      <h3>Options</h3>
      <form className='note-page-container__form'>
        {noteOptions.map((option) => {
          return (
            <div className='note-page-container__form-control' key={option.id}>
              <label htmlFor={option.label}>{option.label}</label>
              <select
                name={option.label}
                id={option.label}
                onChange={(e) => {
                  handleNoteOptionChange(option.usedRule, e.target.value);
                }}
              >
                {option.options.map((opt) => {
                  return (
                    <option value={opt} key={opt}>
                      {opt}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default TempOptions;
