import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

//-const productsRouter = require('./routes/products.router.js');
//import cartsRouter from './routes/carts.router.js';

const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);



app.listen(8080, () => {
    console.log('Server is running on port 8080');
});