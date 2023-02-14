// TS
import { Auth } from "../../types";

const TempAuthContent: React.FC<Auth> = ({ type }) => {
  return (
    <main className='auth-content'>
      <header className='auth-content__title'>
        <h1>Very Cool Notes</h1>
        <hr />
      </header>
      <section className='auth-content__content'>
        {type === "login" ? (
          <>
            <article className='auth-content__content__desc'>
              <p>
                {type === "login"
                  ? "Discover,create,write,update notes in your favorite note taking app!"
                  : "Sign Up in order to be able to write cool notes!"}
              </p>
              <p>
                {type === "login"
                  ? "Sign up or Log in to start your note taking journey."
                  : "At this point i do not know what to write so just sign up."}
              </p>
            </article>
            <img
              src='https://res.cloudinary.com/birthdayreminder/image/upload/v1673600296/Very%20Cool%20Notes%20MERN%20Project/Notes_Monochromatic_ql0bc0.svg'
              alt='Person Looking at Notes'
              width='718'
              height='548'
            />
          </>
        ) : (
          <>
            <img
              src='https://res.cloudinary.com/birthdayreminder/image/upload/v1673513973/Very%20Cool%20Notes%20MERN%20Project/Decision__Monochromatic_1_haqzoj.svg'
              alt='Person Entering a Door'
              width='718'
              height='585'
            />
            <article className='auth-content__content__desc'>
              <p>
                {type === "login"
                  ? "Discover,create,write,update notes in your favorite note taking app!"
                  : "Sign Up in order to be able to write cool notes!"}
              </p>
              <p>
                {type === "login"
                  ? "Sign up or Log in to start your note taking journey."
                  : "At this point i do not know what to write so just sign up."}
              </p>
            </article>
          </>
        )}
      </section>
    </main>
  );
};

export default TempAuthContent;
