export function tag(
  strings: TemplateStringsArray,
  ...keys: unknown[]
): string[] {
  return processTag(strings, keys);
}

export function processTag(
  strings: TemplateStringsArray,
  keys: unknown[],
): string[] {
  const len = strings.length;
  const args: string[] = [];

  for (let i = 0; i < len; ++i) {
    const [parts, whiteStart, whiteEnd] = splitString(strings[i]);
    const key = keys[i];

    concat(args, parts, !whiteStart);

    // There will always be 1 more string than there are keys, so when iterating
    // over the strings, the last key will be undefined.
    if (key !== undefined) {
      concat(args, [key as string], !whiteEnd);
    }
  }

  return args;
}

/**
 * Split a string on whitespace, ignoring any leading and trailing whitespace.
 * Returns an array where the first element is the split elements, the second is
 * a boolean indicating whether the string started with whitespace, and the
 * third indicating whether the string ended with whitespace.
 */
function splitString(str: string): readonly [string[], boolean, boolean] {
  const whiteStart = /^\s/.test(str);
  const whiteEnd = /\s$/.test(str);

  // special case, if string is all whitespace, we want to split it to an
  // empty array instead of ['']
  const split = isWhitespace(str) ? [] : str.trim().split(/\s+/g);

  return [split, whiteStart, whiteEnd] as const;
}

/**
 * Combines `into` and `strs`, modifying `into`. If `combineEdge` is true, then
 * the last element of `into` and the first element of `strs` will be combined
 * into one string.
 */
function concat(into: string[], strs: string[], combineEdge: boolean): void {
  if (combineEdge) {
    const [first, ...rest] = strs;
    extendLastElement(into, first);
    into.push(...rest);
  } else {
    into.push(...strs);
  }
}

function extendLastElement(arr: string[], ext: string): void {
  if (arr.length === 0) {
    arr.push(ext);
  } else {
    arr[arr.length - 1] = arr[arr.length - 1] + ext;
  }
}

function isWhitespace(str: string): boolean {
  return /^\s+$/.test(str);
}
