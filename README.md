# Application Tracking System for FullSuite
This is a website that is integrated with the FullSuite's SuiteLifer's website

### how to communicate with the backend
on a jsx file
```
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

 useEffect(() => {
        axios.get(`${API_BASE_URL}/test-api`)
            .then(response => setMessage(response.data.message))
            .catch(error => console.error("Error fetching data:", error));
    }, []);
```

### installing npm
```
npm install jspdf jspdf-autotable --legacy-peer-deps
```
