module.exports = {
  routes: require('./users-routes'),
  controller: require('./users-controller'),
  model: require('./users-model'),
  strategiesAutentication: require('./strategies-autentication'),
  middlewaresAutentication: require('./middlewares-autentication')
};
