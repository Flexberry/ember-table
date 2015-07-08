import Ember from 'ember';
import {
  module,
  test
  } from 'qunit';
import startApp from '../helpers/start-app';
import {setRandomSeed} from 'dummy/utils/random';

var application;

module('Acceptance: Removable Columns', {
  beforeEach: function() {
    application = startApp();
    setRandomSeed(6);
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('table renders', function(assert) {
  visit('/removable-columns');
  andThen(function() {
    assert.equal(currentPath(), 'removable-columns');
    assert.deepEqual(rowText(0), ['Date', 'Open', 'High', 'Low', 'Close'], "headers");
    assert.deepEqual(rowText(1), ['Thu Jul 14 2005', '22.49', '-18.01', '-47.10', '-0.30'], "values in first row");
  });
});

test('columns can be removed and readded', function(assert) {
  visit('/removable-columns');
  andThen(function() {
    assert.equal(currentPath(), 'removable-columns');
    assert.deepEqual(rowText(0), ['Date', 'Open', 'High', 'Low', 'Close'], "headers");
    assert.deepEqual(rowText(1), ['Thu Jul 14 2005', '22.49', '-18.01', '-47.10', '-0.30'], "values in first row");
  });
  // remove Date
  toggle('Date');
  andThen(function() {
    assert.deepEqual(rowText(0), ['Open', 'High', 'Low', 'Close'], "Date removed in headers columns");
    assert.deepEqual(rowText(1), ['22.49', '-18.01', '-47.10', '-0.30'], "date column removed in first row");
  });
  // remove Date
  toggle('Low');
  andThen(function(){
    assert.deepEqual(rowText(0), ['Open', 'High', 'Close'], "Low removed in headers columns");
    assert.deepEqual(rowText(1), ['22.49', '-18.01', '-0.30'], "Low column removed in first row");
  });
  // add Date
  toggle('Date');
  andThen(function(){
    assert.deepEqual(rowText(0), ['Date', 'Open', 'High', 'Close'], "Date column readded to headers");
    assert.deepEqual(rowText(1), ['Thu Jul 14 2005', '22.49', '-18.01', '-0.30'], "Date column value added to first row");
  });
});

function toggle(headerCellName) {
  click(`button:contains(${headerCellName})`);
}
