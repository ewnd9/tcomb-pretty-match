# tcomb-pretty-match

[![Build Status](https://travis-ci.org/ewnd9/tcomb-pretty-match.svg?branch=master)](https://travis-ci.org/ewnd9/tcomb-pretty-match)

Colorful diff for [`tcomb-validation`](https://github.com/gcanti/tcomb-validation)

## Install

```sh
$ npm install tcomb-pretty-match --save-dev
```

## Examples

### ava

```js
import test from 'ava';

import t from 'tcomb-validation';
import match from 'tcomb-pretty-match';

const User = t.struct({ username: t.String });

test('user valid', t => {
  match({ username: 'admin' }, User); // nothing
  match({ username: 1 }, User); // screenshot below
});
```

![Demonstration](/screen.png?raw=true)

### ava with helper

```js
import test from 'ava';

import t from 'tcomb-validation';
import { match, throws } from 'tcomb-pretty-match/ava';

const User = t.struct({ username: t.String });

test('user valid', t => {
  match(t, { username: 'admin' }, User);

  throws(t, { username: 1 }, User);
  throws(t, { id: 1 }, User);

  throws(t, { id: 1, username: 'admin' }, User, { strict: true });
});
```

## License

MIT © [ewnd9](http://ewnd9.com)
