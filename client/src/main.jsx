import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/socialbudget" element={<App />} />
        <Route path="/" element={<Navigate replace to="/socialbudget" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
