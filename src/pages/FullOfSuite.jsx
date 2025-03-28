import { useState, useEffect } from "react";

const FullOfSuite = () => {
    const [meme, setMeme] = useState(null);

    const fetchMeme = async () => {
        try {
            const response = await fetch("https://meme-api.com/gimme");
            const data = await response.json();
            setMeme(data);
        } catch (error) {
            console.error("Failed to fetch meme:", error);
        }
    };

    useEffect(() => {
        fetchMeme();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
            <h1 className="text-3xl font-bold mb-4">😂 Full of Suite Memes 😂</h1>

            {meme ? (
                <div className="bg-gray-800 p-4 rounded shadow-lg text-center">
                    <img src={meme.url} alt="Meme" className="mt-2 rounded-lg max-w-full h-auto" />
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                        onClick={fetchMeme}
                    >
                        Load Another Meme
                    </button>
                </div>
            ) : (
                <p>Loading meme...</p>
            )}

            {/* Footer for credits */}
            <footer className="mt-6 text-sm text-gray-400 text-center">
                <p>
                    Memes provided by <a href="https://meme-api.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Meme API</a>
                </p>
                <p className="mt-2">Made with ❤️ by:
                    <a href="https://github.com/DarcMattz" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mx-1">Bee</a>•
                    <a href="https://github.com/jzaragosa06" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mx-1">Null</a>•
                    <a href="https://github.com/Luckyyy28" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mx-1">Lucky</a>•
                    <a href="https://github.com/TonYacapin" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mx-1">Anghel</a>
                </p>
            </footer>
        </div>
    );
};

export default FullOfSuite;
