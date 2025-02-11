

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Homepage from "./components/Homepage";
import LandingPage from "./components/LandingPage";
import UpdateForm from "./components/UpdateForm";
import DeleteGameForm from "./components/deleteGameForm";
import CreateGameForm from "./components/CreateGameForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/HomePage" element={<Homepage/>}/>
          <Route  path="/update-game/:id" element={<UpdateForm/>}/>
          <Route  path="/delete-game/:id" element={<DeleteGameForm/>}/>
          <Route path="/create-game" element={<CreateGameForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
