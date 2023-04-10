// Components
import AuthForm from "./AuthForm";
import TempAuthContent from "./TempAuthContent";
// SCSS
import "../../scss/components/Auth/TempAuth.scss";
// TS
import { Auth } from "../../types";

const TempAuth: React.FC<Auth> = ({ type }) => {
  if (type === "login") {
    return (
      <div className='temp-auth-page'>
        <AuthForm type={type} />
        <TempAuthContent type={type} />
      </div>
    );
  }
  return (
    <div className='temp-auth-page'>
      <AuthForm type={type} />
      <TempAuthContent type={type} />
    </div>
  );
};

export default TempAuth;
