const postsControlador = require('./posts-controller');
const middlewaresAutentication = require('..users/middlewares-autentication');

module.exports = app => {
  app
    .route('/post')
    .get(postsControlador.lista)
    .post(
      middlewaresAutentication.bearer,
      postsControlador.adiciona
    );
};
