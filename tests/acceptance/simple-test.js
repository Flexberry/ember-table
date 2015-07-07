import Ember from 'ember';
import {
  module,
  test
  } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Simple', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /simple', function(assert) {
  visit('/simple');
  andThen(function() {
    assert.equal(currentPath(), 'simple');
    assert.deepEqual(rowText(0), ['Date', 'Open', 'High', 'Low', 'Close'], "headers");
    assert.deepEqual(rowText(1), ['Tue Jul 07 2015', '-4.95', '22.49', '-18.01', '-47.10'], "values in first row");
  });
});
