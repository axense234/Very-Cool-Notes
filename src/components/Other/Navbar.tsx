// React Router
import { Link, useNavigate } from "react-router-dom";
// SCSS
import "../../scss/components/Navbar/Navbar.scss";
// Components
import Logo from "../Logos/Logo";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  selectProfile,
  selectSearchResultsQuery,
  setSearchResultsQuery,
} from "../../redux/slices/generalSlice";
import { getNotes } from "../../redux/slices/notesSlice";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { imageUrl, username } = useAppSelector(selectProfile);
  const { title } = useAppSelector(selectSearchResultsQuery);

  const handleSearchResultsQuerySubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/search-results");

    dispatch(getNotes({ title: title as string }));
  };

  return (
    <nav className='navbar-container'>
      <Logo selectable />
      <section className='navbar-container__wrapper'>
        <form
          className='navbar-container__control'
          onSubmit={(e) => handleSearchResultsQuerySubmit(e)}
        >
          <input
            type='text'
            id='nav-control'
            placeholder='ex: My Cool Note'
            value={title}
            onChange={(e) =>
              dispatch(
                setSearchResultsQuery({
                  createdById: "",
                  title: e.target.value,
                })
              )
            }
          />
          <label
            htmlFor='nav-control'
            onClick={() => navigate("/search-results")}
          >
            <img
              src='https://res.cloudinary.com/birthdayreminder/image/upload/v1673720221/Very%20Cool%20Notes%20MERN%20Project/search-icon_lzqaam.webp'
              alt='Search Icon'
              width='25'
              height='24.5'
              onClick={(e) => handleSearchResultsQuerySubmit(e)}
            />
          </label>
        </form>
        <div className='navbar-container__links'>
          <a href='/create'>Create</a>
          <a href='/gallery'>Gallery</a>
          <a href='/about'>About</a>
        </div>
        <Link className='navbar-container__profile' to='/profile'>
          <img
            src={imageUrl}
            alt={`${imageUrl},${username}`}
            width='50'
            height='50'
          />
          <h2>{username || "Default Username"}</h2>
        </Link>
      </section>
    </nav>
  );
};

export default Navbar;
