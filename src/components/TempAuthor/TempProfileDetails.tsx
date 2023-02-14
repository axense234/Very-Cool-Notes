// Redux
import { useAppSelector } from "../../hooks/redux";
import { selectAuthorById } from "../../redux/slices/authorsSlice";
import { selectProfile } from "../../redux/slices/generalSlice";
// TS
import { TempProfileProps } from "../../types";
// Components
import TempProfileDetailsUsed from "./TempProfileDetailsUsed";

const TempProfileDetails: React.FC<TempProfileProps> = ({ type, id }) => {
  const author = useAppSelector((state) =>
    selectAuthorById(state, id as string)
  );
  const profile = useAppSelector(selectProfile);

  const usedProfile = type === "individual-author" ? author : profile;

  return (
    <section className='profile-container__details'>
      <TempProfileDetailsUsed
        imageUrl={usedProfile?.imageUrl as string}
        type={type}
        id={id}
        username={usedProfile?.username as string}
      />
      <p>
        Created Notes:
        {usedProfile?.createdNotes?.length || 0}
      </p>
      <p>
        Favorited Notes:
        {usedProfile?.favoritedNotes?.length || 0}
      </p>
    </section>
  );
};

export default TempProfileDetails;
