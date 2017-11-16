var path = require('path')

module.exports = {
  resolve: {
    alias: {
      'qalendar': path.join(__dirname, '..', 'src')
    }
  },
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      // add your custom rules.
    ],
  },
};
