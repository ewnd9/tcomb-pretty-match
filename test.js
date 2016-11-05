import test from 'ava';

import match from './';
import { match as avaMatch, throws as avaThrows } from './ava';
import t from 'tcomb-validation';

const types = {
  User: t.struct({ username: t.String }),
  String: t.String,
  Number: t.Number
};

test('default', t => {
  match({ username: 'admin' }, types.User);
  t.throws(() => match({ username: 123 }, types.User));

  t.throws(
    () => match({ id: 1, username: 'admin' }, types.User, { strict: true }),
    err => {
      const parts = err.message.trim().split('\n');

      return (parts[0] === '\u001b[90m    | {' &&
              parts[1] === '\u001b[39m\u001b[31m    +   "id": 1,' &&
              parts[2] === '\u001b[39m\u001b[32m    -   "id": "typeof Nil",' &&
              parts[3] === '\u001b[39m\u001b[90m    |   "username": "admin"' &&
              parts[4] === '    | }\u001b[39m');
    }
  );
});

test('ava helper', t => {
  avaMatch(t, { username: 'admin' }, types.User);
  avaMatch(t, '123', types.String);
  avaMatch(t, 123, types.Number);

  avaThrows(t, { username: 1 }, types.User);
  avaThrows(t, { id: 1 }, types.User);
});
