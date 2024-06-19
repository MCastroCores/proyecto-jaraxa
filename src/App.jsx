import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage.jsx";
import { DrugPage } from "./pages/DrugPage.jsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:drugGenericName" element={<DrugPage />} />
    </Routes>
  );
};
