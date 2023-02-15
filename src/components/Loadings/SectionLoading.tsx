// SCSS
import "../../scss/components/Loading/SectionLoading.scss";
// React Spinners
import { BeatLoader } from "react-spinners";
// Hooks
import useCheckWindowWidth from "../../hooks/useCheckWindowWidth";

const SectionLoading: React.FC = () => {
  const changeLoadingSize = useCheckWindowWidth(900);

  return (
    <div className='section-loading'>
      Loading...
      <BeatLoader size={changeLoadingSize ? 37.5 : 75} color='#606060ff' />
    </div>
  );
};

export default SectionLoading;
