import { tag } from '../tag';

describe('tag', () => {
  describe('tag``', () => {
    it('should split the string on whitespace', () => {
      const splits = tag`abc def`;
      expect(splits).toEqual(['abc', 'def']);
    });

    it('should not split whitespace inside interpolation', () => {
      const splits = tag`abc ${'def ghi'} jkl`;
      expect(splits).toEqual(['abc', 'def ghi', 'jkl']);
    });

    it('should combine adjacent strings with interpolation', () => {
      let splits = tag`a${'bc'} def`;
      expect(splits).toEqual(['abc', 'def']);

      splits = tag`${'ab'}c def`;
      expect(splits).toEqual(['abc', 'def']);
    });

    it('should handle the special case where there is whitespace between two interpolations', () => {
      const splits = tag`${'abc'}       ${'def'}`;
      expect(splits).toEqual(['abc', 'def']);
    });

    it('should combine adjacent strings on either side', () => {
      const splits = tag`ab${'cd'}ef`;
      expect(splits).toEqual(['abcdef']);
    });

    it('should ignore leading/trailing whitespace', () => {
      const splits = tag`     abcde fghi  ${'jkl'}  `;
      expect(splits).toEqual(['abcde', 'fghi', 'jkl']);
    });

    it('should treat newlines the same as other whitespace outside interpolcation', () => {
      const val = 'my value';
      const splits = tag`
        mycommand
        --arg=${val}
        --otherArg=true
      `;

      expect(splits).toEqual([
        'mycommand',
        '--arg=my value',
        '--otherArg=true',
      ]);
    });

    it('should respect newlines in interpolation', () => {
      const multilineMessage = `this is my summary

This is the message body`;

      const splits = tag`git commit -m ${multilineMessage}`;

      expect(splits).toEqual(['git', 'commit', '-m', multilineMessage]);
    });
  });
});
