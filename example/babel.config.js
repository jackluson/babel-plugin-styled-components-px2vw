const styledComponentsPx2Vw = require('../lib/index');
module.exports = {
  plugins: [
    [
      styledComponentsPx2Vw,
      {
        propList: ['*', '!border-*'],
        // tags: ['styled'],
        transformRuntime: true,
        viewportWidth: 750,
        unitPrecision: 5,
      },
    ],
  ],
};
