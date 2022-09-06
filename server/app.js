const express = require('express');
const cors = require('cors');
const server = express();
const errorHandler = require('./middleware/errors/error-handler');

const usersController = require('./controllers/users-controler');
const itemsController = require('./controllers/items-controler');
const categorysController = require('./controllers/category-controler');
const loginFilter = require('./filters/login-filter');

server.use(cors({ origin: 'http://localhost:4200' }));
server.use(loginFilter());
server.use(express.json());

server.use('/users', usersController);
server.use('/items', itemsController);
server.use('/categorys', categorysController);
server.use(errorHandler);

server.listen(3000, () => console.log('Listening on http://localhost:3000'));
