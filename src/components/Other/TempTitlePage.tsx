// SCSS
import "../../scss/components/Other/TempTitlePage.scss";
// TS
import { Title } from "../../types";

const TempTitlePage: React.FC<Title> = ({ compWidth, title }) => {
  return (
    <header className='temp-title-page' style={{ width: compWidth }}>
      <h1>{title}</h1>
      <hr />
    </header>
  );
};

export default TempTitlePage;
