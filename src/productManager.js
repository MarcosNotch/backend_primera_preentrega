import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.contador = 0;
  }

  async addProduct(obj) {
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

  async getProductById(id) {
    try {
      const contenido = JSON.parse(await fs.promises.readFile(this.path));

      let contenido1 = contenido.filter((elemento) => {
        return elemento.id == id;
      });

      if (contenido1.length > 0) {
        return contenido1;
      } else {
        return "no existe el producto";
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      let contenido = JSON.parse(data);

      return contenido;
    } catch (e) {
      console.log(e);
    }
  }

  async updateProduct(id, obj) {
    let productos = await this.getProducts();
    let productoActualizado = productos.map((producto) => {
      if (producto.id == id) {
        producto.title = obj.title;
        producto.price = obj.price;
        producto.thumbnail = obj.thumbnail;
        producto.description = obj.description;
        producto.code = obj.code;
        producto.stock = obj.stock;
      }
      return producto;
    });

    const contenidoFinal = JSON.stringify(productoActualizado, null, "\t");

    fs.writeFile(this.path, contenidoFinal, (error) => {
      if (error) {
        console.log("hubo un error");
      } else {
        console.log("Producto Actualizado");
      }
    });
  }

  async deleteProduct(id) {
    try {
      const contenido = JSON.parse(await fs.promises.readFile(this.path));
      let contenido1 = contenido.filter((elemento) => {
 
        return elemento.id !== parseInt(id);
      });

      const contenidoFinal = JSON.stringify(contenido1, null, "\t");



      fs.writeFile(this.path, contenidoFinal, (error) => {
        if (error) {
          console.log("hubo un error");
        } else {
          console.log("Producto eliminado");
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default ProductManager;
