const request = require('supertest');
const express = require('express');
const initapp = require('./app');
const app = initapp({
  mock: './example/mocks'
});

setTimeout(
  () => request(app)
    .get('/v2/store/order/1')
    .expect('Content-Type', /json/)
    .expect('Content-Length', '2')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
    }),
    1000
  )
