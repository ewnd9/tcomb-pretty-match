'use strict';

const t = require('tcomb-validation');

const set  = require('lodash.set');
const chalk = require('chalk');
const { diffJson } = require('diff');
const clone = require('clone');

module.exports = match;
module.exports.getError = getError;

function match(obj, schema, options = {}) {
  const errorMessage = getError(obj, schema, options);

  if (errorMessage) {
    throw new Error(errorMessage);
  }
};

function getError(obj, schema, options) {
  const result = t.validate(obj, schema, options);

  if (!result.isValid()) {
    let errorObject;

    if (typeof obj === 'object') {
      errorObject = clone(obj);

      result.errors
        .forEach(error => {
          set(errorObject, error.path, createErrorProperty(error));
        });
    } else {
      errorObject = createErrorProperty(result.errors[0]);
    }

    // https://github.com/avajs/ava/issues/406#issuecomment-218329720
    const diff = diffJson(obj, errorObject)
      .map(part => {
        if (part.added) return chalk.green(part.value.replace(/.+/g, '    - $&'));
        if (part.removed) return chalk.red(part.value.replace(/.+/g, '    + $&'));

        return chalk.gray(part.value.replace(/.+/g, '    | $&'));
      })
      .join('');

    return `\n${diff}\n`;
  } else {
    return null;
  }
}

function createErrorProperty(error) {
  return `typeof ${error.expected.displayName}`;
}
