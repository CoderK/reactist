const path = require('path');
const config = {
  REACT_NPM_SCRIPTS_PATH: path.join(__dirname, 'ingredients/scripts/react-scripts.js'),
  TEST_NPM_SCRIPTS_PATH: path.join(__dirname, 'ingredients/scripts/test-scripts.js'),
  WEBPACK_TEMPLATE_PATH: path.join(__dirname, 'ingredients/webpack/webpack-template.js'),
  ENZYME_SETTING_PATH: path.join(__dirname, 'ingredients/webpack/enzyme-settings.js'),
  REDUX_SCAFFOLD_PATH: path.join(__dirname, 'ingredients/scaffolds/redux/*'),
  REDUX_SAMPLE_TEST_PATH:  path.join(__dirname, 'ingredients/scaffolds/redux-tests/*'),
  PACKAGE_JSON_PATH: './package.json',
  WEBPACK_CONFIG_PATH: './webpack.config.js',
  ENZYME_PLACEHOLDER: '$[ENZYME_PLACEHOLDER]$'
};

module.exports = Object.assign({}, config);