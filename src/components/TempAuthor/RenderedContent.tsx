// React Router
import { useParams } from "react-router-dom";
// Data
import { profileSettings } from "../../data";
// Redux
import { useAppSelector } from "../../hooks/redux";
import { State } from "../../redux/api/store";
import { selectAuthorById } from "../../redux/slices/authorsSlice";
import { selectProfile } from "../../redux/slices/generalSlice";
import { selectLoadingNotes } from "../../redux/slices/notesSlice";
// TS
import { RenderedContentProps } from "../../types";
// Components
import SectionLoading from "../Loadings/SectionLoading";
import Note from "../Note";

const RenderedContent: React.FC<RenderedContentProps> = ({
  typeOfContent,
  typeOfPage,
}) => {
  const { authorId } = useParams();

  const profile = useAppSelector(selectProfile);
  const author = useAppSelector((state: State) =>
    selectAuthorById(state, authorId as string)
  );
  const loadingNotesState = useAppSelector(selectLoadingNotes);

  const authorNotes = author?.createdNotes;

  const profileNotes =
    (typeOfPage === "individual-author" ? authorNotes : profile.createdNotes) ||
    [];

  if (typeOfContent === "settings") {
    return (
      <div className='profile-container__options-content'>
        <ul className='profile-container__settings'>
          {profileSettings.map((setting) => {
            return <li key={setting.name}>{setting.name}</li>;
          })}
        </ul>
      </div>
    );
  }

  if (typeOfContent === "notes") {
    return (
      <div className='profile-container__options-content'>
        {loadingNotesState === "IDLE" || loadingNotesState === "PENDING" ? (
          <SectionLoading />
        ) : (
          <ul className='profile-container__notes'>
            {profileNotes.length > 0
              ? profileNotes.map(({ note_uid }) => {
                  return (
                    <Note
                      id={note_uid as string}
                      key={note_uid}
                      lineHeight={26}
                      maxChars={100}
                      displayMode
                    />
                  );
                })
              : "User has no notes."}
          </ul>
        )}
      </div>
    );
  }
  return (
    <div className='profile-container__options-content'>
      <ul className='profile-container__notes'>
        {/* YOUR favorited NOTES HERE */}
        <li>f1</li>
        <li>f2</li>
        <li>f3</li>
      </ul>
    </div>
  );
};

export default RenderedContent;
