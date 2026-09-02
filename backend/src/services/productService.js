const productRepository = require("../repositories/productRepository");

function obtenerTodos() {
    return productRepository.obtenerTodos();
}

function crear(producto) {
    return productRepository.crear(producto);
}

module.exports = {
    obtenerTodos,
    crear
};