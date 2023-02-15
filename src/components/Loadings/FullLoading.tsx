// SCSS
import "../../scss/components/Loading/FullLoading.scss";
// React Spinners
import { MoonLoader } from "react-spinners";
// Hooks
import useCheckWindowWidth from "../../hooks/useCheckWindowWidth";

const FullLoading: React.FC = () => {
  const changeLoadingSize = useCheckWindowWidth(768);

  return (
    <div className='full-loading'>
      Loading...
      <MoonLoader size={changeLoadingSize ? 50 : 150} color='#606060ff' />
    </div>
  );
};

export default FullLoading;
