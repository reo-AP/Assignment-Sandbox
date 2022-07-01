import "./App.css";
import React from "react";
import Listing from "./listing-component";
import Fetching from "./fetching-component";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Fetching />} />
          <Route path="/list" element={<Listing />} />
          <Route path="*" element={<Fetching />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
