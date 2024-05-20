const express = require('express');
const { ndown } = require('nayan-media-downloader');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.post('/download', async (req, res) => {
  const url = req.body.url;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const downloadUrl = await ndown(url);
    res.json({ downloadUrl });
  } catch (error) {
    res.status(500).json({ error: 'Error downloading media', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
