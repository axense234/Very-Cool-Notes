// Data
import { profileOptions, authorProfileOptions } from "../../data";
// TS
import {
  OverlayModalFunctionReceivedType,
  TempProfileProps,
  typeOfContentType,
} from "../../types";
// Components
import OverlayModal from "../Modals/OverlayModal";
import RenderedContent from "./RenderedContent";
import TempProfileDetails from "./TempProfileDetails";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { State } from "../../redux/api/store";
import { selectAuthorById } from "../../redux/slices/authorsSlice";
import {
  selectTypeOfContent,
  setOverlayModalFunctionOnConfirmation,
  setOverlayModalMessage,
  setShowOverlay,
  setTypeOfContent,
} from "../../redux/slices/generalSlice";

const TempProfile: React.FC<TempProfileProps> = ({ type, id }) => {
  const dispatch = useAppDispatch();
  const typeOfContent = useAppSelector(selectTypeOfContent);

  const author = useAppSelector((state: State) =>
    selectAuthorById(state, id as string)
  );

  const options =
    type === "individual-author" ? authorProfileOptions : profileOptions;

  const activateOverlayModal = (
    label: OverlayModalFunctionReceivedType,
    message: string
  ) => {
    dispatch(setOverlayModalFunctionOnConfirmation(label));
    dispatch(setOverlayModalMessage(message));
    dispatch(setShowOverlay(true));
  };

  const renderedOptions = options.map((option) => {
    if (type === "individual-author") {
      return (
        <button type='button' key={option.name}>
          {author?.username}
          's&nbsp;
          {option.name}
        </button>
      );
    }

    if (option.label === "signout") {
      return (
        <button
          type='button'
          key={option.name}
          onClick={() =>
            activateOverlayModal(
              option.label as OverlayModalFunctionReceivedType,
              option.overlayModalMessage as string
            )
          }
        >
          {option.name}
        </button>
      );
    }

    if (option.label === "deleteAccount") {
      return (
        <button
          type='button'
          key={option.name}
          onClick={() =>
            activateOverlayModal(
              option.label as OverlayModalFunctionReceivedType,
              option.overlayModalMessage as string
            )
          }
        >
          {option.name}
        </button>
      );
    }

    return (
      <button
        type='button'
        key={option.name}
        onClick={() =>
          dispatch(setTypeOfContent(option.label as typeOfContentType))
        }
      >
        {option.name}
      </button>
    );
  });

  return (
    <div className='profile-container'>
      <TempProfileDetails type={type} id={id} />
      <OverlayModal timer={10} />
      <section className='profile-container__content'>
        <div className='profile-container__options'>{renderedOptions}</div>
        <RenderedContent typeOfContent={typeOfContent} typeOfPage={type} />
      </section>
    </div>
  );
};

export default TempProfile;
