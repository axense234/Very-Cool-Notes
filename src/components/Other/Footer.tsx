// SCSS
import "../../scss/components/Footer/Footer.scss";
// Components
import Logo from "../Logos/Logo";

const Footer: React.FC = () => {
  return (
    <footer className='footer-container'>
      <section className='footer-container__info'>
        <Logo selectable />
        <p>© 2023 axense’s team.All rights reserved.</p>
      </section>
      <section className='footer-container__up'>
        <a href='#navbar-container'>
          <img
            src='https://res.cloudinary.com/birthdayreminder/image/upload/v1673796741/Very%20Cool%20Notes%20MERN%20Project/arrow_up_hafcul.webp'
            alt='Go Up Arrow'
            width='50'
            height='50'
          />
        </a>
        <p>Up</p>
      </section>
    </footer>
  );
};

export default Footer;
