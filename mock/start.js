const express = require('express');
const { mock } = require('mockjs');
const mocks = require('./index');

const app = express(); //实例化express
const port = 9528;
const DELAY = 200;
const BASE_URL = '';

mocks.forEach(({ method, path, response }) => {
  app[method](`${BASE_URL}${path}`, (_req, res) => {
    setTimeout(() => res.json(mock(response)), DELAY);
  });
});

app.listen(port);
