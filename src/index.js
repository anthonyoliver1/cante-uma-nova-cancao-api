require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const cunc = require('./cunc/router');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');

const port = process.env.PORT || 5000;
const app = express();
const router = express.Router();

router.use(express.json());
router.use(logger());
router.use('/cunc', cunc);

router.use(errorHandler());

//Aqui é definido o caminho da rota da api
app.use('/api', router);

const DB_USER = process.env.DB_USER;
const DB_PASS = encodeURIComponent(process.env.DB_PASS);
const DB = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.wwwenr0.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', true);
mongoose.connect(DB)
  .then((_resp) => {
    console.log('MongoDB Connected!');
    console.log(`Running in port: ${port}`)
    app.listen(3000);
  })
  .catch((error) => {
    console.error('MongoDB error', error);
  })

app.listen(port, () => {
  console.log('Server Started');
}).once('error', (error) => {
  console.error(error);
  process.exit(1);
})

module.exports = app;