// React Icons
import { GoTriangleDown, GoTriangleRight } from "react-icons/go";
// React Router
import { Link } from "react-router-dom";
// Components
import Note from "../Note";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  selectSelectedShownFolder,
  selectToggles,
  setToggle,
} from "../../redux/slices/generalSlice";
import { selectAllNotes } from "../../redux/slices/notesSlice";

const GalleryNotes: React.FC = () => {
  const dispatch = useAppDispatch();
  const toggles = useAppSelector(selectToggles);
  const profileNotes = useAppSelector(selectAllNotes);
  const selectedShownFolder = useAppSelector(selectSelectedShownFolder);

  const notesSelector =
    selectedShownFolder === "home" ? null : selectedShownFolder;

  const notes = profileNotes.filter(
    (profileNote) => profileNote.folder_uid === notesSelector
  );

  const renderedNotes = notes.map((note) => {
    return (
      <Note
        id={note.id as string}
        displayMode
        maxChars={100}
        lineHeight={40}
        key={note.id}
      />
    );
  });

  return (
    <section className='gallery-container__notes-container'>
      <div className='gallery-container__notes-container-title'>
        {toggles.folderNotes ? (
          <GoTriangleDown
            onClick={() =>
              dispatch(setToggle({ property: "folderNotes", value: false }))
            }
          />
        ) : (
          <GoTriangleRight
            onClick={() =>
              dispatch(setToggle({ property: "folderNotes", value: true }))
            }
          />
        )}
        <p>Notes{`(${notes.length})`}</p>
      </div>
      {toggles.folderNotes && (
        <ul className='gallery-container__notes'>
          {(notes.length as number) < 1 ? (
            <p id='no-folders'>
              -No notes found,but you can create one&nbsp;
              <Link to='/create'>here</Link>
            </p>
          ) : (
            renderedNotes
          )}
        </ul>
      )}
    </section>
  );
};

export default GalleryNotes;
