// React
import { useEffect, useState } from "react";
// Redux Toolkit
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  createAuthor,
  getProfile,
  loginAuthor,
  selectAuthFormModal,
  selectLoadingProfile,
  updateAuthFormModal,
} from "../../redux/slices/generalSlice";
// Components
import Logo from "../Logos/Logo";
import GithubLogo from "../Logos/GithubLogo";
import GoogleLogo from "../Logos/GoogleLogo";
import AuthFormModal from "../Modals/AuthFormModal";
// TS
import { Auth, AuthorType } from "../../types";

const AuthForm: React.FC<Auth> = ({ type }) => {
  const dispatch = useAppDispatch();
  const loadingProfileState = useAppSelector(selectLoadingProfile);

  const authFormModal = useAppSelector(selectAuthFormModal);

  const [verPassword, setVerPassword] = useState<string>("");
  const [tempAuthDetails, setTempAuthDetails] = useState<AuthorType>({
    email: "",
    password: "",
    username: "Default Username",
  });

  // On Change Handlers
  const onEmailChange = (email: string) =>
    setTempAuthDetails({ ...tempAuthDetails, email });

  const onPassChange = (password: string) =>
    setTempAuthDetails({ ...tempAuthDetails, password });

  const onVerPassChange = (verPass: string): void => setVerPassword(verPass);

  // Handle Sign Up/Login
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { password } = tempAuthDetails;

    if (password !== verPassword) {
      dispatch(
        updateAuthFormModal({
          msg: "Passwords do not match!",
          show: true,
        })
      );
    } else if (type === "login") {
      // LOGIN
      dispatch(loginAuthor(tempAuthDetails));
    } else if (type === "signup") {
      dispatch(createAuthor(tempAuthDetails));
    }
  };

  useEffect(() => {
    if (loadingProfileState === "IDLE") {
      dispatch(getProfile());
    }
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (authFormModal.show) {
      timeout = setTimeout(() => {
        dispatch(updateAuthFormModal({ ...authFormModal, show: false }));
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [authFormModal.show]);

  return (
    <aside className='auth-sidebar'>
      <Logo selectable={false} />
      <div className='auth-sidebar-content-wrapper'>
        <div className='auth-sidebar__container'>
          <hr className='main-sideline' />
          <div className='auth-sidebar__content'>
            <section className='auth-sidebar__first-section'>
              <div className='auth-sidebar__first-section__title'>
                <hr />
                <h2>{type === "login" ? "Login" : "Sign Up"}</h2>
                <hr />
              </div>
              <form className='auth-sidebar__first-section__controls'>
                {/* GOOGLE AND GITHUB,IMPLEMENT LOGIC LATER */}
                <button type='button'>
                  <GoogleLogo />
                  Google
                </button>
                <button type='button'>
                  <GithubLogo />
                  Github
                </button>
              </form>
            </section>
            <section className='auth-sidebar__second-section'>
              <div className='auth-sidebar__second-section__title'>
                <hr />
                <h2>or</h2>
                <hr />
              </div>
              <form
                className='auth-sidebar__second-section__controls'
                onSubmit={(e) => handleFormSubmit(e)}
              >
                <AuthFormModal
                  msg={authFormModal.msg as string}
                  show={authFormModal.show as boolean}
                />
                <div>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={tempAuthDetails.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onEmailChange(e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    value={tempAuthDetails.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onPassChange(e.target.value)
                    }
                    required
                    minLength={10}
                  />
                </div>
                <div>
                  <label htmlFor='ver-password'>Verify Password</label>
                  <input
                    type='password'
                    name='ver-password'
                    id='ver-password'
                    value={verPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onVerPassChange(e.target.value)
                    }
                  />
                </div>
                <div className='recaptcha-control'>
                  {/* RECAPTCHA LOGIC HERE,IMPLEMENT LOGIC LATER */}
                  <input type='checkbox' name='recap' id='recap' value='yes' />
                  <label htmlFor='recap'>I'm not a robot.</label>
                  <img
                    src='https://res.cloudinary.com/birthdayreminder/image/upload/v1673692794/Very%20Cool%20Notes%20MERN%20Project/recaptcha-logo-1_d0i8tg.webp'
                    alt='RECAPTCHA Logo'
                    width='41.5'
                    height='39.5'
                  />
                </div>
                <button type='submit'>
                  {type === "login" ? "Login" : "Sign Up"}
                </button>
              </form>
              <div className='auth-sidebar__second-section__other-auth-meth'>
                {type === "login" ? (
                  <p>
                    Don't have an account?
                    <a href='/signup'>Sign up!</a>
                  </p>
                ) : (
                  <p>
                    Have an account?
                    <a href='/'>Log in!</a>
                  </p>
                )}
              </div>
            </section>
          </div>
          <hr className='main-sideline' />
        </div>
        <hr id='bottom-sideline' />
      </div>
    </aside>
  );
};

export default AuthForm;
