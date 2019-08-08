export function tag(strings: TemplateStringsArray, ...keys: any[]) {
  return processTag(strings, keys);
}

export function processTag(strings: TemplateStringsArray, keys: any[]) {
  const len = strings.length;
  const args: string[] = [];

  for (let i = 0; i < len; ++i) {
    const [parts, whiteStart, whiteEnd] = splitString(strings[i]);
    const key = keys[i];

    concat(args, parts, !whiteStart);

    // There will always be 1 more string than there are keys, so when iterating
    // over the strings, the last key will be undefined.
    if (key !== undefined) {
      concat(args, [key], !whiteEnd);
    }
  }

  return args;
}

function splitString(str: string) {
  const whiteStart = /^\s/.test(str);
  const whiteEnd = /\s$/.test(str);

  // special case, if string is all whitespace, we want to split it to an
  // empty array instead of ['', '']
  const split = /^\s+$/.test(str) ? [] : str.trim().split(/\s+/g);

  return [split, whiteStart, whiteEnd] as const;
}

function concat(into: string[], strs: string[], combineEdge: boolean) {
  if (combineEdge) {
    const [first, ...rest] = strs;
    extendLastElement(into, first);
    into.push(...rest);
  } else {
    into.push(...strs);
  }
}

const extendLastElement = (arr: string[], ext: string) => {
  if (arr.length === 0) {
    arr.push(ext);
  } else {
    arr[arr.length - 1] = arr[arr.length - 1] + ext;
  }
};
