import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import template from './template';
import App from './app';
import Info from './app/info';
import pkg from '../package.json';

const server = express();

server.use('/static', express.static(path.resolve('./dist/static')));

server.get('/', (req, res) => {
  const initialState = { message: 'Hello!' };
  res.send(
    template({
      body: renderToString(<App {...initialState} />),
      title: 'React SSR demo',
      initialState: JSON.stringify(initialState),
      isProd: process.env.NODE_ENV === 'production',
    })
  );
});

server.get('/info', (req, res) => {
  res.json({
    string: renderToString(<Info info={pkg} />),
    state: { info: pkg },
  });
});

server.listen(8080);
console.log('listening to 8080');
