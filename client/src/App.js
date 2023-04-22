import React from "react";
import "./App.css";

import {
  BrowserRouter,Routes, Route
} from "react-router-dom";

import Private from "./components/private";
import Login from './pages/login';
import Register from './pages/Register';
import Home from "./pages/Home";



function App() {
  return (
    <div className="App">
   <BrowserRouter>
   <Routes>
    <Route element= {<Private />}>
      <Route path="/" element= {<Home />} />
    </Route>
    <Route path="/register"  element= {<Register/>}    />
    <Route path="/login"  element = {<Login />}  />

   </Routes>
   
   </BrowserRouter>

    </div>
  
  );
}

export default App;
