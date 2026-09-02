const db = require("./database");

db.prepare(`
    CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        precio REAL NOT NULL,
        stock INTEGER NOT NULL DEFAULT 0,
        imagen TEXT,
        video TEXT,
        categoria TEXT
    )
`).run();

console.log("Tabla productos creada correctamente");

const productRepository = require("../repositories/productRepository");

productRepository.crear({
    nombre: "Latitas con chicles (30 latitas)",
    descripcion: "",
    precio: 14900,
    stock: 0,
    imagen: "img/latas.png",
    video: "",
    categoria: "chicles"
});

console.log("Producto creado");