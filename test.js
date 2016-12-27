import test from 'ava';

import match from './';
import { match as avaMatch, throws as avaThrows } from './ava';
import t from 'tcomb-validation';

const types = {
  User: t.struct({ username: t.String }),
  String: t.String,
  Number: t.Number
};

test('default', async t => {
  match({ username: 'admin' }, types.User);
  t.throws(() => match({ username: 123 }, types.User));

  const err = await t.throws(() => match({ id: 1, username: 'admin', age: undefined }, types.User, { strict: true }));

  t.deepEqual(err.message.trim().split('\n'), [
    '\u001b[90m    | {',
    '\u001b[39m\u001b[31m    +   \"age\": \"undefined\",',
    '    +   \"id\": 1,',
    '\u001b[39m\u001b[32m    -   \"age\": \"typeof Nil\",',
    '    -   \"id\": \"typeof Nil\",',
    '\u001b[39m\u001b[90m    |   \"username\": \"admin\"',
    '    | }\u001b[39m'
  ]);
});

test('ava helper', t => {
  avaMatch(t, { username: 'admin' }, types.User);
  avaMatch(t, '123', types.String);
  avaMatch(t, 123, types.Number);

  avaThrows(t, { username: 1 }, types.User);
  avaThrows(t, { id: 1 }, types.User);
});
