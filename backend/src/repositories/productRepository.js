const db = require("../database/database");

function obtenerTodos() {
    return db.prepare("SELECT * FROM productos").all();
}

function crear(producto) {
    const stmt = db.prepare(`
        INSERT INTO productos
        (nombre, descripcion, precio, stock, imagen, video, categoria)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    return stmt.run(
        producto.nombre,
        producto.descripcion,
        producto.precio,
        producto.stock,
        producto.imagen,
        producto.video,
        producto.categoria
    );
}

module.exports = {
    obtenerTodos,
    crear
};