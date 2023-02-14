// Components
import Note from "../Note";
import SectionLoading from "../Loadings/SectionLoading";
// Redux
import { useAppSelector } from "../../hooks/redux";
import {
  selectLoadingNotes,
  selectNoteIds,
} from "../../redux/slices/notesSlice";
import { selectSearchResultsQuery } from "../../redux/slices/generalSlice";

const SearchResultsContent: React.FC = () => {
  const noteIds = useAppSelector(selectNoteIds);
  const loadingNotesState = useAppSelector(selectLoadingNotes);
  const { title } = useAppSelector(selectSearchResultsQuery);

  if (loadingNotesState === "IDLE" || loadingNotesState === "PENDING") {
    return <SectionLoading />;
  }

  return (
    <ul className='search-results-container__notes'>
      {noteIds.length >= 1 ? (
        noteIds.map((id) => {
          return (
            <li key={id} className='search-results-container__notes-li'>
              <Note id={id} maxChars={100} lineHeight={45} />
            </li>
          );
        })
      ) : (
        <p id='no-notes-found'>No notes found with title: {title}</p>
      )}
    </ul>
  );
};

export default SearchResultsContent;
