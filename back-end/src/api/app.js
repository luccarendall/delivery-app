const express = require('express');
const saleRouter = require('../router/SaleRouter');
const { errorMiddleware } = require('../middlewares/ErrorMiddleware');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/sales', saleRouter);

app.use(errorMiddleware);

module.exports = app;
