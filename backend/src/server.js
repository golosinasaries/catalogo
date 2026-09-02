const express = require("express");
const productController = require("./controllers/productController");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensaje: "Backend de Golosinas Aries funcionando"
    });
});

app.get("/productos", productController.obtenerTodos);
app.post("/productos", productController.crear);

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});