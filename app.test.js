const request = require('supertest');
const express = require('express');
const initapp = require('./app');
const app = initapp({
  mock: './example/mocks'
});

const test = () => {
  request(app)
    .get('/v2/store/order/1')
    .expect('Content-Type', /json/)
    .expect('Content-Length', '2')
    .expect(200, {})
    .end(function(err, res) {
      if (err) throw err;
    });

  request(app)
    .get('/v2/pet/1')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(res => {
      console.warn(res.body);
      const body = JSON.parse(res.body);
      console.warn(body)
    })
    .end(function(err, res) {
      if (err) throw err;
    });
};

setTimeout(test, 1000);
