// SCSS
import "../scss/components/About/About.scss";
// Data
import { aboutSections } from "../data";
// Components
import TempTitlePage from "../components/Other/TempTitlePage";

const About: React.FC = () => {
  return (
    <div className='about-container'>
      <TempTitlePage compWidth='30%' title='About' />
      <ul className='about-container__sections'>
        {/* LOOPING THROUGH SECTIONS */}
        {aboutSections.map((section) => {
          return (
            <li key={section.id}>
              <section className='about-container__section'>
                <p>{section.textContent}</p>
                <div className='about-container__section-images'>
                  {/* LOOPING THROUGH SECTION IMAGES */}
                  {section.images.map((img) => {
                    return (
                      <a href={img.destinationUrl} key={img.id}>
                        <img
                          src={img.imageUrl}
                          alt={img.destinationUrl}
                          key={img.id}
                        />
                      </a>
                    );
                  })}
                </div>
              </section>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default About;
