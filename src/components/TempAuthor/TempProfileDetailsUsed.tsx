// React Icons
import { AiOutlineClose } from "react-icons/ai";
// React Router
import { Link } from "react-router-dom";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updateAuthor } from "../../redux/slices/authorsSlice";
import {
  createCloudinaryImage,
  selectEditMode,
  selectProfile,
  setEditMode,
  setProfileProperty,
} from "../../redux/slices/generalSlice";

interface TempProfileDetailsUsedProps {
  imageUrl: string;
  username: string;
  type: "individual-author" | "profile";
  id?: string;
}

const TempProfileDetailsUsed: React.FC<TempProfileDetailsUsedProps> = ({
  imageUrl,
  username,
  type,
  id,
}) => {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector(selectEditMode);
  const profile = useAppSelector(selectProfile);

  const handleProfileDetailsFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      updateAuthor({
        id: profile.author_uid,
        username: profile.username,
        imageUrl: profile.imageUrl,
      })
    );
    dispatch(setEditMode(false));
  };

  if (editMode && type === "profile") {
    return (
      <form
        className='profile-details-edit-form'
        onSubmit={(e) => handleProfileDetailsFormSubmit(e)}
      >
        <AiOutlineClose onClick={() => dispatch(setEditMode(false))} />
        <div className='profile-details-edit-form__image'>
          <img
            src={profile.imageUrl}
            alt='Edit Mode'
            width='400'
            height='400'
          />
          <input
            type='file'
            name='editProfileImage'
            id='editProfileImage'
            onChange={(e) => {
              if (e.target.files) {
                const image = e.target.files[0];
                dispatch(createCloudinaryImage(image));
              }
            }}
          />
        </div>
        <input
          type='text'
          name='username'
          id='username'
          value={profile.username}
          onChange={(e) =>
            dispatch(
              setProfileProperty({
                property: "username",
                value: e.target.value,
              })
            )
          }
        />
        <button type='submit' onClick={() => dispatch(setEditMode(true))}>
          Submit
        </button>
      </form>
    );
  }

  return (
    <div className='profile-details-used-form'>
      <Link to={type === "profile" ? `/profile` : `/authors/${id}`}>
        <img src={imageUrl} alt={username} width='400' height='400' />
      </Link>
      <h2>{username}</h2>
      {type === "profile" && (
        <button type='submit' onClick={() => dispatch(setEditMode(true))}>
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default TempProfileDetailsUsed;
