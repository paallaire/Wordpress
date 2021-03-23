module.exports = function ({ addComponents, theme }) {
  const screens = theme('screens');
  const prefix = 'screen: ';

  const components = {
    '.debug-screens::before': {
      position: 'fixed',
      zIndex: '2147483647',
      right: '0',
      bottom: '0',
      padding: '.3333333em .5em',
      fontSize: '12px',
      lineHeight: '1',
      fontFamily: 'sans-serif',
      backgroundColor: '#000',
      color: '#fff',
      boxShadow: '0 0 0 1px #fff',
      content: `'${prefix}_'`,
    },
  };

  Object.entries(screens).forEach((item) => {
    const screen = item[0];

    components[`@screen ${screen}`] = {
      '.debug-screens::before': {
        content: `'${prefix}${screen}'`,
      },
    };
  });

  addComponents(components);
};
