import fs from "fs";

class cartManager {
  constructor(path) {
    this.path = path;
    this.contador = 0;
  }

  async createCart(obj) {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, "[]");
      }

      const data = JSON.parse(await fs.promises.readFile(this.path));

      if (data.length == 0) {
        obj.id = 1;
      } else {
        obj.id = data[data.length - 1].id + 1;
      }

      data.push(obj);

      const contenido = JSON.stringify(data, null, "\t");

      await fs.promises.writeFile(this.path, contenido);
    } catch (e) {
      console.log(e);
    }
  }

  async getProductsInCart(id) {
    try {
    

      const data = await fs.promises.readFile(this.path, "utf-8");
      let contenido = JSON.parse(data);

      let carrito = contenido.filter((elemento) => {
        return elemento.id == id;
      });

      return carrito[0].products;
    } catch (e) {
      console.log(e);
    }
  }

  async addProductToCart(CartId, ProductId) {
    try {
        const data = await fs.promises.readFile(this.path, "utf-8");

        let contenido = JSON.parse(data);
        
        let carritoIndex = contenido.findIndex((elemento) => {
            return elemento.id == CartId;
        });

        let ProductoIndex = contenido[carritoIndex].products.findIndex((elemento) => {
            return elemento.id == ProductId;
        });

        if (ProductoIndex == -1) {
            contenido[carritoIndex].products.push({id: parseInt(ProductId), quantity: 1});
        } else {
            contenido[carritoIndex].products[ProductoIndex].quantity += 1;
        }
        
        const contenido1 = JSON.stringify(contenido, null, "\t");

        await fs.promises.writeFile(this.path, contenido1);
        
    } catch (e) {
      console.log(e);
    }
  }


}

export default cartManager;