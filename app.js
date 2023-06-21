const express = require('express');
const { NotFoundError } = require('./errors');
const config = require('./config');
const db = require('./db');
const eventsRouter = require('./events');

const app = express();
const baseRouter = express.Router();

app.use(express.json());
db.connect();

baseRouter.use('/events', eventsRouter);

app.use('/api/v3/app', baseRouter);

app.use((req, res, next) => {
  throw new NotFoundError();
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: {
      message,
    },
  });
});

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
