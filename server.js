require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const NASA_API_KEY = process.env.NASA_API_KEY || "API_KEY";
const NEWS_API_KEY = process.env.NEWS_API_KEY; // Usa la clave del .env
import { NEWS_API_KEY, NASA_API_KEY } from './config.js';
app.use(cors()); // Permite solicitudes desde el frontend
app.use(express.json());
app.use(express.static("public")); // Para servir archivos estáticos como HTML, CSS, JS

// Ruta para obtener la imagen del día de la NASA (APOD)
app.get("/apod", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener datos de la NASA" });
  }
});

// Ruta para obtener noticias
app.get("/news", async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&language=es`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error al obtener noticias:", error);
    res.status(500).json({ error: "Error al obtener noticias" });
  }
});

// Ruta principal para servir el HTML con los botones
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta para servir la página de noticias
app.get("/news-page", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "news.html"));
});

// Ruta para servir la página de la NASA
app.get("/nasa-page", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "nasa.html"));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
