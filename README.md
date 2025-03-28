# Application Tracking System for FullSuite

This is a website that is integrated with the FullSuite's SuiteLifer's website

## Overview

The **Application Tracking System (ATS)** is a web-based system integrated with FullSuite's **SuiteLifer** website. It helps manage and track job applicants efficiently.

## Features

- View and manage applicant details.
- Export applicant data to XLSX.
- Auto-email notifications for new applicants and blacklisted applicants.
- Overlapping filters for better applicant search.
- Clickable table rows for quick access to applicant details.
- Warning of duplicate entries.

## Communication with the Backend

To interact with the backend API in a JSX file, use the following approach:

```jsx
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

useEffect(() => {
  axios
    .get(`${API_BASE_URL}/test-api`)
    .then((response) => setMessage(response.data.message))
    .catch((error) => console.error("Error fetching data:", error));
}, []);
```

## 📂 Project Structure

```
/src
│── /components   # Reusable UI components
│── /pages        # Page components
│── /hooks        # Custom hooks
│── /context      # Global state management
│── /services     # API calls
│── /utils        # Helper functions
│── App.jsx       # Main App component
│── main.jsx      # Entry point
```

## 📌 Where to Put Functions?

✅ **Utility Functions** → `/src/utils/` (e.g., format dates, validation)

```js
// /src/utils/dateUtils.js
export const formatDate = (date) => new Date(date).toLocaleDateString();
```

✅ **API Functions** → `/src/services/` (e.g., fetch applicants)

```js
// /src/services/applicantService.js
import axios from "axios";
export const getApplicants = async () => axios.get("/api/applicants");
```

✅ **Custom Hooks** → `/src/hooks/` (e.g., handle state & effects)

```js
// /src/hooks/useApplicants.js
import { useState, useEffect } from "react";
import { getApplicants } from "../services/applicantService";
export const useApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  useEffect(() => {
    getApplicants().then(({ data }) => setApplicants(data));
  }, []);
  return applicants;
};
```

✅ **Context Functions** → `/src/context/` (e.g., authentication, filters)

```js
// /src/context/AuthContext.jsx
import { createContext, useState, useContext } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
```

## Environment Variables

Ensure the **VITE_API_BASE_URL** is set correctly in the `.env` file:

```
VITE_API_BASE_URL=https://your-backend-url.com
```

## 🚀 Setup

```sh
npm install  # Install dependencies
npm run dev  # Run the project
npm run build  # Build for production
npm test  # Run tests
```

That's it! 🎯
