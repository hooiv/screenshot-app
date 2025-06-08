import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Add some basic styling

function App() {
    const [url, setUrl] = useState('https://www.google.com');
    const [width, setWidth] = useState(1920);
    const [height, setHeight] = useState(1080);
    const [screenshot, setScreenshot] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setScreenshot('');

        try {
            const response = await axios.post('http://localhost:3001/api/screenshot', 
                { url, width, height },
                { responseType: 'blob' } // IMPORTANT: receive the image as a blob
            );
            
            const imageObjectURL = URL.createObjectURL(response.data);
            setScreenshot(imageObjectURL);

        } catch (err) {
            setError('Failed to capture screenshot. Is the URL valid?');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="App">
            <header>
                <h1>Automated Screenshot Tool</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" required />
                <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="Width" required />
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height" required />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Capturing...' : 'Capture Screenshot'}
                </button>
            </form>

            {error && <p className="error">{error}</p>}

            {screenshot && (
                <div className="screenshot-container">
                    <h2>Result:</h2>
                    <img src={screenshot} alt="Website screenshot" />
                </div>
            )}
        </div>
    );
}

export default App;
