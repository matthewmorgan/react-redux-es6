if (process.env.NODE_ENC === 'production'){
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}
