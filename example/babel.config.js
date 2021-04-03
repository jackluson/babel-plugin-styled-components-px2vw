const styledComponentsPx2Vw = require('../dist/index');
module.exports = {
  plugins: [
    [
      styledComponentsPx2Vw,
      {
        propList: ['*', '!border-*'],
        // tags: ['styled'],
        viewportWidth: 750,
        unitPrecision: 3,
      },
    ],
  ],
};
