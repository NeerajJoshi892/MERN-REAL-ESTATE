import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter >
    <Header/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
