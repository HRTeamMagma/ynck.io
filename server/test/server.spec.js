'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

describe('basic server', function() {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  it('sends back hello world', function(done) {
    request(app)
      .get('/api')
      .expect(200)
      .expect(function(res) {
        expect(res.text).to.equal('Hello World!');
      })
      .end(done);
  });

  it('accepts POST request', function(done) {
    request(app)
      .post('/api')
      .expect(201)
      .expect(function(res) {
        expect(res.body.data).to.equal('Posted!');
      })
      .end(done);
  });

  it('returns latest images from api call', function(done) {
    request(app)
      .get('/api/latest-images')
      .expect(200)
      .expect(function(res) {
        expect(res.body.length).to.equal(6);
      })
      .end(done);
  });

});

