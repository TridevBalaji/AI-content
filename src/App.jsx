import React from "react";
import Home from "../src/Home/home"; 
import Page from "./components/page"; 
import GenOb from "../src/components1/genpageob"; 
import StrmOb from "../src/components2/strmobpage";
import Strmtxt from "../src/components3/strmtxtpage"; 
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/page" element={<Page />} /> 
        <Route path="/genpageob" element={<GenOb />} />
        <Route path="/strmobpage" element={<StrmOb />} />
        <Route path="/strmtxtpage" element={<Strmtxt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
