'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

let app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let isRunning = false;

app.start = (port) => {
  if (isRunning) {
    console.log(`Server already running`);

  } else {
    app.listen(port, err => {
      if (err) { throw err; };
      isRunning = true;
      console.log(`Server running on port ${port}`);
    });
  };
};

app.stop = () => {
  app.close(() => {
    console.log(`Server has been shut down`);
    isRunning = false;
  })
}

module.exports = app;