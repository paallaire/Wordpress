const _ = require('lodash');

module.exports = function ({ addUtilities, e, theme, variants }) {
  const rotates = theme('rotate', {});
  const rotateVariants = variants('rotate', []);

  const utilities = _.map(rotates, (value, name) => ({
    [`.${e(`rotate-test-${name}`)}`]: {
      transform: `rotate(${value})`
    }
  }));

  addUtilities(utilities, rotateVariants);
};
