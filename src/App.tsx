import React from "react";
import SignIn from "./pages/SingIn";
import GlobalStyle from "./styles/global";
import Home from './pages/Home/Home'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import RegisterClasses from "./pages/Classes/RegisterClasses";
import Classes from "./pages/Classes";
import Users from "./pages/Users/registerUsers";

const App: React.FC = () => (
  <>
    <Router>
      <Routes >
        <Route path="/Login" element={<SignIn/>}></Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="*" element={<Home/>}></Route>
      </Routes>
    </Router>
    <GlobalStyle />
  </>
);


export default App;
