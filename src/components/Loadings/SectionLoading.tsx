// SCSS
import "../../scss/components/Loading/SectionLoading.scss";
// React Spinners
import { BeatLoader } from "react-spinners";

const SectionLoading: React.FC = () => {
  return (
    <div className='section-loading'>
      Loading...
      <BeatLoader size={75} color='#606060ff' />
    </div>
  );
};

export default SectionLoading;
