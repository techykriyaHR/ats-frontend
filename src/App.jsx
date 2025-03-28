import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Listings from "./pages/Listings";
import LoginPage from "./pages/LoginPage";
import AddApplicantForm from "./pages/AddApplicantForm";
import ApplicantDetailsPage from "./pages/ApplicantDetailsPage";
import PrivateRoute from "./context/PrivateRoute";
import PublicRoute from "./context/PublicRoute";
import FullOfSuite from "./pages/FullOfSuite";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ats" element={<PrivateRoute element={<Listings />} />} />
        <Route path="/add-applicant" element={<PrivateRoute element={<AddApplicantForm />} />} />
        <Route path="/applicant/:id" element={<PrivateRoute element={<ApplicantDetailsPage />} />} />
        <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/fullofsuite" element={<PublicRoute element={<FullOfSuite />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;