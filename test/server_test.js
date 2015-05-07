'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

require('../lib/server.js'); //run our server

describe('My Cool Server', function() {

  it('should respond to a request for the time', function(done) {
    chai.request('localhost:3000')
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        var date = new Date();
        expect(res.body.time).to.eql(date.getHours() + ': ' +
          date.getMinutes() + ': ' + date.getSeconds());
        done();
      });
  });

  it('should respond to a get request for a greeting', function(done) {
    chai.request('localhost:3000')
    .get('/greet/Jude')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.msg).to.eql('hello Jude');
      expect(res.body.msg).to.not.eql('hey Jude');
      done();
    });
  });

  it('should respond to a post request for a greeting', function(done) {
    chai.request('localhost:3000')
    .post('/greet')
    .send({name: 'Esteban'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.msg).to.eql('hello Esteban');
      done();
    });
  });

  it('should have a 404 page', function(done) {
    chai.request('localhost:3000')
    .get('/rtyui873v98y3v')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(404);
      expect(res.body.msg).to.eql('Could not find page.');
      done();
    });
  });
}); //end describe
