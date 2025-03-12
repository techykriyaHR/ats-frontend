# 🚀 Application Tracking System (ATS) for FullSuite

The **Application Tracking System (ATS)** is a web-based platform integrated with FullSuite's **SuiteLifer** website. It streamlines the process of managing and tracking job applicants efficiently.

---

## 📌 Features

✅ View and manage applicant details effortlessly.  
✅ Export applicant data to XLSX format.  
✅ Auto-email notifications for new and blacklisted applicants.  
✅ Advanced filtering with overlapping search capabilities.  
✅ Clickable table rows for quick access to applicant details.  
✅ Duplicate entry detection and warnings.  

---

## 🛠️ Project Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/ats-fullsuite.git
cd ats-fullsuite
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and define your backend API URL:
```sh
VITE_API_BASE_URL=https://your-backend-url.com
```

### 4️⃣ Run the Application
```sh
npm run dev  # Start the development server
npm run build  # Build for production
npm test  # Run tests
```

---

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

---

## 🔄 Backend Communication

To interact with the backend API, use the following approach in a JSX file:

```jsx
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

useEffect(() => {
  axios
    .get(`${API_BASE_URL}/test-api`)
    .then((response) => setMessage(response.data.message))
    .catch((error) => console.error("Error fetching data:", error));
}, []);
```

---

## 🏗️ Where to Place Functions?

📌 **Utility Functions** → `/src/utils/` (e.g., formatting, validation)
```js
// /src/utils/dateUtils.js
export const formatDate = (date) => new Date(date).toLocaleDateString();
```

📌 **API Functions** → `/src/services/` (e.g., fetching applicants)
```js
// /src/services/applicantService.js
import axios from "axios";
export const getApplicants = async () => axios.get("/api/applicants");
```

📌 **Custom Hooks** → `/src/hooks/` (e.g., manage state & effects)
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

📌 **Context Functions** → `/src/context/` (e.g., authentication, filters)
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

---

## 🎯 Best Practices

✅ Use `.env` for API configurations.  
✅ Follow the defined project structure for maintainability.  
✅ Keep API calls centralized in `/services/`.  
✅ Use **custom hooks** for reusable logic.  
✅ Use **context providers** for global state management.  
