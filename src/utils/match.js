const match = (option, options) => {
  return options[option] || options.default;
};

export default match;
