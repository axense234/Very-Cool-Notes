// SCSS
import "../../scss/components/Loading/FullLoading.scss";
// React Spinners
import { MoonLoader } from "react-spinners";

const FullLoading: React.FC = () => {
  return (
    <div className='full-loading'>
      Loading...
      <MoonLoader size={150} color='#606060ff' />
    </div>
  );
};

export default FullLoading;
