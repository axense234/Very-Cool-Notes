// SCSS
import "../scss/components/NotFoundPage/NotFoundPage.scss";
// Components
import Navbar from "../components/Other/Navbar";
import Footer from "../components/Other/Footer";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className='notfound-container'>
        <h1>404</h1>
        <p>
          -Could not find the page you were looking for,please check the URL to
          see if something is incorrect
        </p>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
