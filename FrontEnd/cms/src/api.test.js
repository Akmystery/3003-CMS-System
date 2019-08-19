import React from 'react';
import axios from 'axios';
import moxios from 'moxios';
import sinon from 'sinon';
import {equal} from 'assert';

describe('mocking axios requests', function() {
  beforeEach(function() {
    moxios.install(axios)
  })

  afterEach(function() {
    moxios.uninstall(axios)
  })

  it('Post Request For Emergency', function(done) {
    moxios.withMock(function() {
      let onFulfilled = sinon.spy()
      axios.post('http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/emergency').then(onFulfilled)
      moxios.wait(function() {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
        }).then(function() {
          equal(onFulfilled.called, true)
          done()
        })
      })
    })
  })
})
