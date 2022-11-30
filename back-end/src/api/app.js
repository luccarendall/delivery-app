const express = require('express');
const registerRoutes = require('../routes/registerRoutes');
const saleRouter = require('../router/SaleRouter');
const { ErrorMiddleware } = require('../middlewares/ErrorMiddleware');

const app = express();

app.use(express.json());
app.use('/sales', saleRouter);
app.use('/register', registerRoutes);
app.get('/coffee', (_req, res) => res.status(418).end());
app.use(ErrorMiddleware);

module.exports = app;
