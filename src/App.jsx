import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Listings from "./pages/Listings";
import LoginPage from "./pages/LoginPage";
import AddApplicantForm from "./pages/AddApplicantForm";
import ApplicantDetailsPage from "./pages/ApplicantDetailsPage";
import PrivateRoute from "./context/PrivateRoute";
import PublicRoute from "./context/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
        <Route path="/hr_ats" element={<PrivateRoute element={<Listings />} />} />
        <Route path="/add-applicant" element={<PrivateRoute element={<AddApplicantForm />} />} />
        <Route path="/applicant/:id" element={<PrivateRoute element={<ApplicantDetailsPage />} />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/tomato" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;