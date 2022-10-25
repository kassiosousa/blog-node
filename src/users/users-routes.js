const usersController = require('./users-controller');
const middlewaresAutentication = require('./middlewares-autentication');

module.exports = app => {
  app
    .route('/user/login')
    .post(middlewaresAutentication.local, usersController.login);

  app
    .route('/user/logout')
    .get(middlewaresAutentication.bearer, usersController.logout);

  app
    .route('/user')
    .post(usersController.adiciona)
    .get(usersController.lista);

  app
    .route('/user/:id')
    .delete(middlewaresAutentication.bearer, usersController.deleta);
};
