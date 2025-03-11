# Application Tracking System for FullSuite

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
    axios.get(`${API_BASE_URL}/test-api`)
        .then(response => setMessage(response.data.message))
        .catch(error => console.error("Error fetching data:", error));
}, []);
```

## Environment Variables
Ensure the **VITE_API_BASE_URL** is set correctly in the `.env` file:

```
VITE_API_BASE_URL=https://your-backend-url.com
```

## Installation & Setup
1. **Clone the Repository**
   ```sh
   git clone https://github.com/kriyahr/ats-frontend.git
   cd ats-fullsuite
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Run the Application**
   ```sh
   npm run dev
   ```

