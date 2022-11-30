const express = require('express');
const saleRouter = require('../router/SaleRouter');
const loginRouter = require('../router/loginRouter');
const { errorMiddleware } = require('../middlewares/ErrorMiddleware');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/sales', saleRouter);
app.use('/login', loginRouter);

app.use(errorMiddleware);

module.exports = app;
