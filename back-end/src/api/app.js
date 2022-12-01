const express = require('express');
const cors = require('cors');
const productRouter = require('../routes/productRouter');
const registerRouter = require('../routes/registerRouter');
const saleRouter = require('../routes/saleRouter');
const loginRouter = require('../routes/loginRouter');
const authRouter = require('../routes/authRouter');
const { ErrorMiddleware } = require('../middlewares/ErrorMiddleware');

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
}));

app.use('/sales', saleRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/products', productRouter);
app.use('/validate', authRouter);
app.get('/coffee', (_req, res) => res.status(418).end());
app.use(ErrorMiddleware);

module.exports = app;
