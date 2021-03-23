/* eslint-disable func-names */
const _ = require('lodash');

module.exports = function ({ addUtilities, e, theme, variants }) {
  const container = theme('container', {});
  const utilities = _.map(container, (value, name) => {
    return {
      [`.${e(`container-${name}`)}`]: {
        maxWidth: `${value}`,
        boxSizing: 'content-box',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: theme('spacing.4'),
        paddingRight: theme('spacing.4'),

        [`@media (min-width: ${theme('screens.lg')})`]: {
          paddingLeft: theme('spacing.6'),
          paddingRight: theme('spacing.6')
        }
      },
      [`.${e(`container-${name}-px-none`)}`]: {
        maxWidth: `${value}`,
        boxSizing: 'content-box',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    };
  });

  addUtilities(utilities, ['responsive']);
};
