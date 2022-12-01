const express = require('express');
const productsRouter = require('../router/ProductRouter');
const registerRouter = require('../routes/registerRouter');
const saleRouter = require('../routes/saleRouter');
const loginRouter = require('../routes/loginRouter');
const { ErrorMiddleware } = require('../middlewares/ErrorMiddleware');

const app = express();

app.use(express.json());

app.use('/sales', saleRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/products', productsRouter);
app.get('/coffee', (_req, res) => res.status(418).end());
app.use(ErrorMiddleware);

module.exports = app;
