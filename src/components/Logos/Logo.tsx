// React Router
import { Link } from "react-router-dom";
// SCSS
import "../../scss/components/Logos/Logo.scss";

interface LogoProps {
  selectable: boolean;
}

const Logo: React.FC<LogoProps> = ({ selectable }) => {
  return (
    <Link to={selectable ? "/home" : "/"} className='main-logo'>
      <img
        src='https://res.cloudinary.com/birthdayreminder/image/upload/v1673255414/Very%20Cool%20Notes%20MERN%20Project/Logo_srgsop.png'
        alt='Very Cool Notes Logo'
        height='61.5'
        width='250'
      />
    </Link>
  );
};

export default Logo;
