import Ember from 'ember';
import {
  module,
  test
  } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Configurable Columns', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /configurable-columns', function(assert) {
  visit('/configurable-columns');
  andThen(function() {
    assert.equal(currentPath(), 'configurable-columns');
    assert.deepEqual(rowText(0), ['Date', 'Open', 'High', 'Low', 'Close'], "headers");
    assert.deepEqual(rowText(1), ['Thu Jul 14 2005', '22.49', '-18.01', '-47.10', '-0.30'], "values in first row");
  });
});
