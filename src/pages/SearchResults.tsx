// React
import { useEffect } from "react";
// SCSS
import "../scss/components/SearchResults/SearchResults.scss";
// React Router
import { useNavigate } from "react-router-dom";
// Hooks
import useCheckWindowWidth from "../hooks/useCheckWindowWidth";
// TS
import { filterByType } from "../types";
// Data
import { searchResultsFilterBy } from "../data";
// Components
import TempTitlePage from "../components/Other/TempTitlePage";
import SearchResultsContent from "../components/SearchResults/SearchResultsContent";
// Redux
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getNotes, setFilterBy } from "../redux/slices/notesSlice";
import { selectSearchResultsQuery } from "../redux/slices/generalSlice";

const SearchResults: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { title } = useAppSelector(selectSearchResultsQuery);

  const redirectToHomePage = useCheckWindowWidth(1440);

  useEffect(() => {
    if (redirectToHomePage) {
      navigate("/home");
    }
  }, [redirectToHomePage]);

  useEffect(() => {
    dispatch(getNotes({ title: title as string, createdById: "" }));
  }, []);

  return (
    <div className='search-results-container'>
      <section className='search-results-container__title'>
        <TempTitlePage compWidth='100%' title={`Results for ${title}`} />
        <div className='search-results-container__options'>
          <label htmlFor='filterBy'>Filter By:</label>
          <select
            name='filterBy'
            id='filterBy'
            onChange={(e) => setFilterBy(e.target.value as filterByType)}
          >
            {searchResultsFilterBy.map((option) => {
              return (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>
      </section>
      <section className='search-results-container__content'>
        <SearchResultsContent />
      </section>
    </div>
  );
};

export default SearchResults;
