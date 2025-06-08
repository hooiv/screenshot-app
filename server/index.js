const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Allow requests from our React app
app.use(express.json()); // Allow server to read JSON from requests

// The core API endpoint
app.post('/api/screenshot', async (req, res) => {
    try {
        const { url, width, height } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const browser = await puppeteer.launch({ args: ['--no-sandbox'] }); // '--no-sandbox' is important for deployment
        const page = await browser.newPage();

        await page.setViewport({ width: parseInt(width), height: parseInt(height) });
        await page.goto(url, { waitUntil: 'networkidle2' });

        const screenshotBuffer = await page.screenshot({ type: 'png', fullPage: true });

        await browser.close();

        // Send the image back to the client
        res.set('Content-Type', 'image/png');
        res.send(screenshotBuffer);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to capture screenshot.' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
