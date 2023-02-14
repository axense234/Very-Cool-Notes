// React
import { useEffect } from "react";
// SCSS
import "../../scss/components/Author/TempAuthor.scss";
// React Router
import { useParams } from "react-router-dom";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getAuthors } from "../../redux/slices/authorsSlice";
import { selectProfile } from "../../redux/slices/generalSlice";
import { getNotes } from "../../redux/slices/notesSlice";
// TS
import { TempProfileProps } from "../../types";
// Components
import Recomandations from "./Recommandations";
import TempProfile from "./TempProfile";

const TempAuthor: React.FC<TempProfileProps> = ({ type }) => {
  const { authorId } = useParams();
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAuthors());
    dispatch(getNotes({ title: "", createdById: authorId || profile.id }));
  }, [authorId, profile.id]);

  return (
    <div className='temp-author-page'>
      <TempProfile type={type} id={authorId || profile.id} />
      <Recomandations type={type} />
    </div>
  );
};

export default TempAuthor;
