const productService = require("../services/productService");

function obtenerTodos(req, res) {
    const productos = productService.obtenerTodos();
    res.json(productos);
}

function crear(req, res) {
    const producto = productService.crear(req.body);
    res.json(producto);
}

module.exports = {
    obtenerTodos,
    crear
};