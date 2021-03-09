import Chai from 'chai'
import ChaiHTTP from 'chai-http'
import pkg from 'mocha'
const { describe, it: test } = pkg
import app from '../index.js'

Chai.should()
Chai.use(ChaiHTTP)

const testInvalidRoute = () => {
  describe('testInvalidRoute', () => {
    test('Testing Call against a non existent route.', done => {
      Chai.request(app)
        .get('/doesNotExist')
        .end((req, res) => {
          res.should.have.a.status(404)
          done()
        })
    })
  })
}

describe('TESTING API', () => {
  testInvalidRoute()
})
