import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Login from "./pages/Login";

function App() {

  return (
    <div className="App">
      <h1>Fantasy Fridge</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
