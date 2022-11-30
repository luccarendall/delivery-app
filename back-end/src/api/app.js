const express = require('express');
const registerRoutes = require('../routes/registerRoutes');
const errorHandler = require('../middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use('/register', registerRoutes);
app.get('/coffee', (_req, res) => res.status(418).end());
app.use(errorHandler);

module.exports = app;
