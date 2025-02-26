const express = require('express');
const cors = require('cors');
const { ttdl, ytmp3, ytmp4, igdl, fbdl, ytsearch } = require('ruhend-scraper');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de ruhend-scraper' });
});

// TikTok Downloader
app.get('/tiktok', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Falta el parámetro URL' });
    
    const data = await ttdl(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// YouTube MP3
app.get('/ytmp3', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Falta el parámetro URL' });
    
    const data = await ytmp3(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// YouTube MP4
app.get('/ytmp4', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Falta el parámetro URL' });
    
    const data = await ytmp4(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Instagram Downloader
app.get('/instagram', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Falta el parámetro URL' });
    
    const result = await igdl(url);
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Facebook Downloader
app.get('/facebook', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Falta el parámetro URL' });
    
    const result = await fbdl(url);
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// YouTube Search
app.get('/ytsearch', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Falta el parámetro de búsqueda (q)' });
    
    const { video, channel } = await ytsearch(q);
    res.json({ videos: video, channels: channel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
