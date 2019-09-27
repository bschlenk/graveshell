import execa = require('execa');
import { processTag } from './tag';

type ChildProcess = execa.ExecaChildProcess<string>;
type Options = execa.Options<string>;
type ShellTemplate = (
  strings: TemplateStringsArray,
  ...keys: unknown[]
) => ChildProcess;
type Factory = (options?: Options) => ShellTemplate;

const factory: Factory = options => (strings, ...keys) => {
  const [prog, ...args] = processTag(strings, keys);
  return execa(prog, args, options);
};

const exec = factory();

/**
 * Use as a string template tag. Parses the command and runs through `execa`.
 * Interpolated variables are always escaped. To call with a string containing
 * spaces, just pass the string in as an interpolated variable. If an
 * interpolated variable is directly adjacent to a string within the template,
 * they will be combined.
 */
function $(strings: TemplateStringsArray, ...keys: unknown[]): ChildProcess;
/**
 * Called as a regular function, the first argument is interpreted as options to
 * pass to `execa`. This returns a template tag that can be used immediately,
 * which will call `execa` with the provided options.
 * @param options
 */
function $(options: Options): ShellTemplate;
function $(
  options: TemplateStringsArray | Options,
  ...keys: unknown[]
): ChildProcess | ShellTemplate {
  if (Array.isArray(options)) {
    return exec(options as TemplateStringsArray, ...keys);
  }

  return factory(options as Options);
}

/**
 * A shorthand for calling `execa` with `{ stdio: 'inherit' }`, since it is
 * common to call a shell command for its side effects while sending its output
 * to the terminal.
 */
$.run = factory({ stdio: 'inherit' });

/**
 * A shorthand for configuring `execa` to ignore all stdout/stderr.
 */
$.devnull = factory({ stdio: 'ignore' });

export default $;
