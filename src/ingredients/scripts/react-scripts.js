module.exports = {
    "start": "npm run build && node ./node_modules/webpack-dev-server/bin/webpack-dev-server.js",
    "build": "node ./node_modules/webpack/bin/webpack.js --progress",
    "build:watch": "node ./node_modules/webpack/bin/webpack.js --progress --watch",
    "build:production": "webpack -p --env production",
    "deploy": "npm run build:production"
};