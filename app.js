const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv/config');
const PORT = process.env.PORT || 4000;
const DB_CONNECTION = process.env.DB_CONNECTION;

const categoryRouter = require('./routes/categories');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orders');
const userRouter = require('./routes/users');

const app = express();

app.use(bodyParser.json());

app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/users', userRouter);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

mongoose.connect(DB_CONNECTION)
.then(() => {
    console.log('DB CONNECTED');
})
.catch((err) => {
    console.log(err);
});

app.listen(PORT, ()=>{
    console.log(`The server is running in port ${PORT}`);
});