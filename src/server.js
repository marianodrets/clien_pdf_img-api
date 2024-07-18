const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3001;

app.use(cors()); // Habilitar CORS para todas las rutas

// Configuración de Multer para guardar los archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Crear la carpeta de uploads si no existe
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// Ruta para subir las imágenes
app.post("/upload", upload.array("images"), (req, res) => {
    res.send("Imágenes subidas exitosamente");
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
