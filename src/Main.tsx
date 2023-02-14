// React
import React from "react";
// React Router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Components
import Layout from "./components/Other/Layout";
// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import IndAuthor from "./pages/IndAuthor";
import About from "./pages/About";
import IndNote from "./pages/IndNote";
import SearchResults from "./pages/SearchResults";
import WriteNote from "./pages/WriteNote";
import NotFoundPage from "./pages/NotFoundPage";
import UpdateNote from "./pages/UpdateNote";

const Main: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Layout />}>
          <Route path='gallery' element={<Gallery />} />
          <Route path='about' element={<About />} />
          <Route path='profile' element={<Profile />} />
          <Route path='authors/:authorId' element={<IndAuthor />} />
          <Route path='notes/:noteId' element={<IndNote />} />
          <Route path='notes/update/:noteId' element={<UpdateNote />} />
          <Route path='search-results' element={<SearchResults />} />
          <Route path='create' element={<WriteNote />} />
          <Route path='home' index element={<Home />} />
        </Route>
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default Main;
