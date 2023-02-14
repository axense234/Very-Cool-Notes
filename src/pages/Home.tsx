// React
import { useEffect } from "react";
// SCSS
import "../scss/components/Home/Home.scss";
// Components
import TempTitlePage from "../components/Other/TempTitlePage";
import NoteExamples from "../components/Note/NoteExamples";

const Home: React.FC = () => {
  return (
    <main className='home-container'>
      <section className='home-container__directions-container'>
        <TempTitlePage compWidth='100%' title='Very Cool Notes' />
        <article className='home-container__directions'>
          <p>
            Start writing your first note now!
            <a href='/create'>Create a note!</a>
          </p>
          <p>
            Check other people’s notes!
            <a href='/search-results'>Check out notes!</a>
          </p>
          <p>
            Check out your own profile!
            <a href='/profile'>Check out profile!</a>
          </p>
        </article>
      </section>
      <section className='home-container__rcn'>
        <TempTitlePage compWidth='100%' title='Recently Created Notes' />
        <NoteExamples />
      </section>
    </main>
  );
};

export default Home;
