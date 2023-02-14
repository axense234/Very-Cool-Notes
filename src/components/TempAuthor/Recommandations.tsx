// React Router
import { useParams } from "react-router-dom";
// Redux
import { useAppSelector } from "../../hooks/redux";
import { selectAuthorIds } from "../../redux/slices/authorsSlice";
import { selectProfile } from "../../redux/slices/generalSlice";
// Components
import TempTitlePage from "../Other/TempTitlePage";
import TempProfileDetails from "./TempProfileDetails";

interface RecomandationsProps {
  type: "individual-author" | "profile";
}

const Recomandations: React.FC<RecomandationsProps> = ({ type }) => {
  const { id: profileId } = useAppSelector(selectProfile);
  const { authorId } = useParams();
  const idUsed = type === "individual-author" ? authorId : profileId;

  const authorIds = useAppSelector(selectAuthorIds);

  const filteredAuthorIds = authorIds.filter((id) => idUsed !== id);

  return (
    <div className='recommandations-container'>
      <TempTitlePage compWidth='100%' title='You might also like' />
      <ul className='recommandations-container__authors'>
        {filteredAuthorIds.map((filteredId) => {
          return (
            <TempProfileDetails
              type='individual-author'
              id={filteredId as string}
              key={filteredId}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Recomandations;
