import { processTag } from './tag';

export function tag(strings: TemplateStringsArray, ...keys: any[]) {
  return processTag(strings, keys);
}
