import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import Landing from "./views/Landing";
import Header from "./views/Header";
function App() {
  return (
    <>
      <Header />
      <Landing />
    </>
  );
}

export default App;
