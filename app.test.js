// These are mainly integration tests as openapi-mock mainly exists as an integration of external tools
const request = require('supertest');
const express = require('express');
const initapp = require('./app');
const assert = require('assert');

// const test = () => {
//   request(app)
//     .get('/v2/store/order/1')
//     .expect('Content-Type', /json/)
//     .expect('Content-Length', '2')
//     .expect(200, {})
//     .end(function(err, res) {
//       if (err) throw err;
//     });
// };
//
// setTimeout(test, 1000);

describe('app', () => {
  let app;
  let server;
  before(async() => {
    let wrap = await initapp({
      mock: './example/mocks'
    });
    app = wrap.app;
    server = wrap.server;
    return new Promise((resolve) => {
      setTimeout(() => {
        a = 1;
        resolve();
      }, 1000);
    });
  });

  after(() => {server.close()});

  it('should return Content-Type=json for a valid api request', done => {
    request(app)
      .get('/v2/store/order/1')
      .expect('Content-Type', /json/)
      .expect(200, done)//TODO: remove?
  });
  it('should return status 200 for a valid api request', done => {
    request(app)
      .get('/v2/store/order/1')
      .expect(200, done)
  });
  it('should return a generated response matching spec for endpoints without an example', done => {
    request(app)
      .get('/v2/pet/1')
      .expect(res => {
        assert.ok(res.body.name.length > 0)
      })
      .expect(200, done)
  });
  it.skip('should return example JSON for endpoints with an example', done => {
    console.error('TODO:');
    assert.ok(false);
  });
})
