# graveshell

Run shell commands as simply as you would in Bash, without the overhead of
running in an actual shell. Utilizes es6
[tagged template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates)
for a nice intuitive syntax. Calls [execa](https://www.npmjs.com/package/execa)
under the hood to process the commands.

## Installation

```bash
npm install graveshell
```

## Usage

```js
import $ from 'graveshell';

const dir = '/my/directory with spaces';
const { stdout } = await $`ls ${dir}`;
const files = stdout.split('\n');
```

The default function exported by `graveshell` is overloaded - it can be called
as both a template tag and a function.

As a template tag, it will treat all interpolated variables as if they were
quoted, and pass along to `execa`, returning the `Promise` result from `execa`.

As a function, it allows you to pass an `options` object along to `execa`. It
actually returns a new template tag function bound to the passed in `options`
object, so you can then call it with your shell command.

```js
const message = 'This is my commit message';
await $({ cwd: 'my/package' })`git commit -m ${message}`;
```

Within the command's string template, whitespace is ignored, so you can format
your command nicely:

```js
const data = 'key=value';
const url = 'http://my-url.com';

const { stdout } = await $`
  curl
    -X POST
    -d ${data}
    ${url}
`;
```

A few convenience functions are exposed that call `execa` with a preconfigured
options object.

### run

Calls `execa` with `stdio: 'inherit'`:

```js
// options will be set to { stdio: 'inherit' }
$.run`my-command`;
```

### devnull

Calls `execa` with `stdio: 'ignore'`:

```js
// options will be set to { stdio: 'ignore' }
$.devnull`my-command`;
```
