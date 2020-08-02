const express = require('express');
const boom = require('express-boom');
const cors = require('cors');
const {errors} = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(boom());

app.use(cors({exposedHeaders:['Content-Length', 'Content-Type', 'X-Total-Count']}));
app.use(routes);
app.use(errors());


module.exports = app;