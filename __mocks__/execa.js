module.exports = (prog, args, options) => {
  return Promise.resolve({
    prog,
    args,
    options,
  });
};
