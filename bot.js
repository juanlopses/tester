const express = require('express');
const cors = require('cors');
const { YtdlCore, toPipeableStream } = require('@ybd-project/ytdl-core');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para habilitar CORS
app.use(cors());

// Ruta para descargar videos
app.get('/download', async (req, res) => {
  try {
    const videoUrl = req.query.url;
    
    if (!videoUrl) {
      return res.status(400).json({ error: 'Se requiere el parámetro URL' });
    }

    const ytdl = new YtdlCore();
    const info = await ytdl.getBasicInfo(videoUrl);
    
    // Sanear el título para el nombre del archivo
    const title = info.videoDetails.title.replace(/[^a-zA-Z0-9 ]/g, '_');
    const filename = `${title}.mp4`;

    // Configurar headers de respuesta
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'video/mp4');

    // Obtener y transmitir el stream de video
    const stream = await ytdl.download(videoUrl);
    toPipeableStream(stream).pipe(res);

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ 
      error: 'Error al descargar el video',
      message: error.message
    });
  }
});

// Manejador de errores para rutas no existentes
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
