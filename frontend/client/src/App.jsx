

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Homepage from "./components/Homepage";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/HomePage" element={<Homepage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
