import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import React from "react";
import Landing from "./views/Landing";
import Header from "./views/Header";
function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Header />
        <Landing />
      </Suspense>
    </>
  );
}

export default App;
