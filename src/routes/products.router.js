import { Router } from "express";
import productManager from "../productManager.js";

const pm = new productManager('productos.json');

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {

    let { limit } = req.query;
    if(limit){
        limit = parseInt(limit);
        const products = await pm.getProducts();
        res.send(products.slice(0, limit));
    }
    else{
        const products = await pm.getProducts();
        res.send(products);
    }
});

productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await pm.getProductById(pid);
    res.send(product);
});

productsRouter.post('/', async (req, res) => {
    const producto = req.body;
    await pm.addProduct(producto); 
    res.send("Producto añadido");
});

productsRouter.put('/:pid', async (req, res) => {
    console.log("entre aca")
    const { pid } = req.params;
    const producto = req.body;
    await pm.updateProduct(pid, producto);
    res.send("Producto actualizado");
});

productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    await pm.deleteProduct(pid);
    res.send("Producto eliminado");
});




export default productsRouter;