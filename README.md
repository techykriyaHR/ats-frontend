# **Application Tracking System (ATS) for FullSuite**

This website integrates with FullSuite's **SuiteLifer** platform to streamline applicant tracking and management.

---

## **📌 Overview**

The **Application Tracking System (ATS)** is a web-based tool designed to efficiently manage and track job applicants. It provides features for easy data handling, filtering, and automated notifications.

---

## **🚀 Features**

✔ View and manage applicant details  
✔ Export applicant data to **XLSX**  
✔ **Auto-email notifications** for new and blacklisted applicants  
✔ **Overlapping filters** for refined applicant searches  
✔ **Clickable table rows** for quick access to applicant details  
✔ **Duplicate entry warnings** to prevent redundancy

---

## **📂 Project Structure**

```
/src
│── /components
│   ├── TopJobPositions.jsx
│   ├── InfoTooltip.jsx
│── /pages
│   ├── Dashboard.jsx
│   ├── Applicants.jsx
│── /hooks
│   ├── useApplicants.js
│── /context
│   ├── AuthContext.jsx
│── /services
│   ├── applicantService.js
│── /utils
│   ├── dateUtils.js
│── App.jsx
│── main.jsx
│── .env
```

---

## **📡 Backend Communication**

To interact with the backend API in a JSX file, use the following approach:

```jsx
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const [message, setMessage] = useState("");

useEffect(() => {
  axios
    .get(`${API_BASE_URL}/test-api`)
    .then((response) => setMessage(response.data.message))
    .catch((error) => console.error("Error fetching data:", error));
}, []);
```

---

## **📌 Where to Put Functions?**

✅ **Utility Functions** → `/src/utils/` _(e.g., format dates, validation)_

```js
// /src/utils/dateUtils.js
export const formatDate = (date) => new Date(date).toLocaleDateString();
```

✅ **API Functions** → `/src/services/` _(e.g., fetch applicants)_

```js
// /src/services/applicantService.js
import axios from "axios";
export const getApplicants = async () => axios.get("/api/applicants");
```

✅ **Custom Hooks** → `/src/hooks/` _(e.g., handle state & effects)_

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

✅ **Context Functions** → `/src/context/` _(e.g., authentication, filters)_

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

## **🛠 Environment Variables**

Ensure the **VITE_API_BASE_URL** is set correctly in the `.env` file:

```
VITE_API_BASE_URL=https://your-backend-url.com
```

---

## **📦 Installation & Setup**

```sh
# Install dependencies
npm install

# Run the project in development mode
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

---

## **🖥️ Running the Project**

1. Clone the repository

   ```sh
   git clone https://github.com/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies

   ```sh
   npm install
   ```

3. Start the development server
   ```sh
   npm run dev
   ```
