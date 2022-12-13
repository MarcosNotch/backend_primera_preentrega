import { Router } from "express";
import cartManager from "../cartManager.js";

const cartsRouter = Router();

const cm = new cartManager("carritos.json");

cartsRouter.post("/", async (req, res) => {
  const productos = req.body;
  await cm.createCart(productos);
  res.send("Carrito creado");
});

cartsRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const products = await cm.getProductsInCart(cid);
  res.send(products);
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const producto = req.body;
  await cm.addProductToCart(cid, pid, producto);
});


export default cartsRouter;