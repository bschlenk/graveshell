import $ from '..';

jest.mock('execa');

describe('graveshell', () => {
  it('should let you call a function with the default options', () => {
    return expect($`ls`).resolves.toEqual({
      prog: 'ls',
      args: [],
      options: undefined,
    });
  });

  it('should let you send options to execa', () => {
    return expect($({ cwd: 'abc' })`ls -la`).resolves.toEqual({
      prog: 'ls',
      args: ['-la'],
      options: {
        cwd: 'abc',
      },
    });
  });

  it('should expose a run method which sets stdio to inherit', () => {
    return expect($.run`ls -l -a -h`).resolves.toEqual({
      prog: 'ls',
      args: ['-l', '-a', '-h'],
      options: {
        stdio: 'inherit',
      },
    });
  });
});
