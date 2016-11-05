'use strict';

const prettyMatch = require('./');
const { getError } = prettyMatch;

exports.match = match;
exports.throws = throws;

function match(t, obj, schema, options = {}) {
  const errorMessage = getError(obj, schema, options);
  t.falsy(errorMessage ? 'error' : '', errorMessage);
}

function throws(t, obj, schema, options = {}) {
  t.throws(() => prettyMatch(obj, schema, options));
} 
