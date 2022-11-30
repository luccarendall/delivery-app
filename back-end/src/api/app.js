const express = require('express');
const saleRouter = require('../router/SaleRouter');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/sales', saleRouter);

module.exports = app;
