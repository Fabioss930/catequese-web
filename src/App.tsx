import React from "react";
import SignIn from "./pages/SingIn";
import GlobalStyle from "./styles/global";
import Home from './pages/Home/Home'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

const App: React.FC = () => (
  <>
    <Router>
      <Routes>
        <Route  path="/Login" element={<SignIn />} ></Route>
        <Route  path="/" element={<Home />} ></Route>
        <Route  path='*' element={<SignIn />} />
      </Routes>
    </Router>
    <GlobalStyle />
  </>
);


export default App;
