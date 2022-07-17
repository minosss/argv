# argv

**tips**

- all starts with `--`
- no boolean like `--foo=true` use `--foo` or `--no-foo`
- supports string array `--filter=pkg/* --filter=ext/*` returns `{filter: ['pkg/*', 'ext/*']}`
- after `--` will save to `__`
- the same key overwrites the previous one, excepts for string

Install

```sh
pnpm add @yme/argv
```

Usage

```js
import parser from '@yme/argv';

const argv = parser(process.argv.slice(2));
// => {_: [...], ...}

const hello = parser(['--have', '--a', '--good=6', '--day=today', '--no-bad', 'banana']);
// => {_: ['banana'], have: true, a: true, good: 6, day: 'today', bad: false}

// duplicate keys
const arr = parser(['--filter=packages/*', '--filter=exts/*']);
// => {filter: ['packages/*', 'exts/*']}

const overwrite = parser(['--foo', '--no-foo', '--bar', '--bar=bar']);
// => {foo: false, bar: 'bar'}

// camelcase key
const k = parser(['--foo-bar']);
// => {fooBar: true}
```
