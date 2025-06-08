# Mini BrowserStack - Automated Screenshot Tool

This project is a web application that takes a URL and a device size, then generates a screenshot of that website using a headless browser on a server.

## Tech Stack

*   **Frontend:** React (with Vite)
*   **Backend:** Node.js + Express.js
*   **Automation/Headless Browser:** Puppeteer
*   **API Calls:** Axios

## Project Structure

```
screenshot-app/
├── client/         (React Frontend)
│   ├── src/
│   └── package.json
└── server/         (Node.js Backend)
    ├── node_modules/ (typically gitignored)
    ├── package.json
    └── index.js
```

## Getting Started

### Prerequisites

*   Node.js and npm (or yarn) installed.

### Setup

1.  **Clone the repository (if applicable) or ensure you have the project files.**
2.  **Server Setup:**
    ```bash
    cd server
    npm install
    ```
3.  **Client Setup:**
    ```bash
    cd client
    npm install
    ```

### Running the Application Locally

1.  **Start the Backend Server:**
    *   Navigate to the `server` directory:
        ```bash
        cd server
        ```
    *   Run the server:
        ```bash
        node index.js
        ```
    *   The server will typically start on `http://localhost:3001`.

2.  **Start the Frontend Development Server:**
    *   Navigate to the `client` directory:
        ```bash
        cd client
        ```
    *   Run the client:
        ```bash
        npm run dev
        ```
    *   Open your browser and go to the URL provided by Vite (usually `http://localhost:5173` or similar).

## How it Works

1.  The React frontend provides a form to input a URL and desired screenshot dimensions (width and height).
2.  When submitted, the frontend makes an API call (using Axios) to the backend Express server.
3.  The backend API endpoint (`/api/screenshot`):
    *   Receives the URL and dimensions.
    *   Launches a headless instance of Puppeteer (Chromium).
    *   Navigates to the provided URL.
    *   Sets the viewport size.
    *   Takes a full-page screenshot.
    *   Sends the screenshot image back to the client as a PNG.
4.  The frontend receives the image data (as a blob), creates an object URL, and displays the screenshot.

## Deployment

(Instructions for deploying the frontend to Vercel/Netlify and the backend to Render/Heroku would go here, as per the original project description.)

*   **Backend (e.g., Render):**
    *   Root Directory: `server`
    *   Build Command: `npm install`
    *   Start Command: `node index.js`
*   **Frontend (e.g., Vercel/Netlify):**
    *   Root Directory: `client`
    *   Build Command: (Vite's default, e.g., `npm run build`)
    *   **Important:** Remember to update the API URL in `client/src/App.jsx` to point to your live backend URL after deploying the server.
