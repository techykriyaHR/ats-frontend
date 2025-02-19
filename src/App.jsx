
// import './App.css'

// function App() {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold underline">
//         Hello world!
//       </h1>
//     </div>
//   )
// }

// export default App
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Load from .env

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get(`${API_BASE_URL}/test-api`)
            .then(response => setMessage(response.data.message))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h1>Frontend</h1>
            <p>Backend says: {message}</p>
        </div>
    );
}

export default App;
