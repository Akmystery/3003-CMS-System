import React from 'react';
import axios from 'axios';
import moxios from 'moxios';
import sinon from 'sinon';
import {
  equal
} from 'assert';

describe('mocking axios requests', function() {
  beforeEach(function() {
    moxios.install(axios)
  })

  afterEach(function() {
    moxios.uninstall(axios)
  })

  it('Get Request For PSIStationInformation', function(done) {
    moxios.withMock(function() {
      let onFulfilled = sinon.spy()
      axios.get('http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/PSIStationInformation').then(onFulfilled)
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

  it('Get Request For Emergencies', function(done) {
    moxios.withMock(function() {
      let onFulfilled = sinon.spy()
      axios.get('http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/getemergencies').then(onFulfilled)
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

  it('Get Request For DengueInformation', function(done) {
    moxios.withMock(function() {
      let onFulfilled = sinon.spy()
      axios.get('http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/DengueInformation').then(onFulfilled)
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

  it('Get Request For weatherStationInformation', function(done) {
    moxios.withMock(function() {
      let onFulfilled = sinon.spy()
      axios.get('http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/weatherStationInformation').then(onFulfilled)
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

  it('Get Request For weatherStationsList', function(done) {
    moxios.withMock(function() {
      let onFulfilled = sinon.spy()
      axios.get('http://ec2-18-197-243-11.eu-central-1.compute.amazonaws.com/weatherStationsList').then(onFulfilled)
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
