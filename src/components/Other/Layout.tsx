// React
import { useEffect } from "react";
// React Router
import { Outlet } from "react-router-dom";
// Components
import Navbar from "./Navbar";
import Footer from "./Footer";
import FullLoading from "../Loadings/FullLoading";
// SCSS
import "../../scss/globals.scss";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  getProfile,
  selectLoadingAuthorization,
  selectLoadingProfile,
} from "../../redux/slices/generalSlice";

const Layout: React.FC = () => {
  const dispatch = useAppDispatch();
  const loadingProfileState = useAppSelector(selectLoadingProfile);
  const loadingAuthorization = useAppSelector(selectLoadingAuthorization);

  useEffect(() => {
    if (loadingProfileState === "IDLE") {
      dispatch(getProfile());
    }
  }, [dispatch]);

  if (
    loadingProfileState === "IDLE" ||
    loadingProfileState === "PENDING" ||
    loadingAuthorization === "PENDING"
  ) {
    return <FullLoading />;
  }

  return (
    <>
      <Navbar />
      <>
        <Outlet />
      </>
      <Footer />
    </>
  );
};

export default Layout;
