// All subsequent files required by node with the extensions .es6, .es, .jsx and .js will be transformed by Babel.
require('@babel/register');

// Allows you to use the full set of ES6 features on server-side (place it before anything else)
require('@babel/polyfill');

// Start the server
const app = require('./app.js').default;

module.exports = app;
