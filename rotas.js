const posts = require('./src/posts');
const users = require('./src/users');
// const tags = require('./src/tags');
// const categories = require('./src/categories');
const functionsCommon = require('./src/functions-commom');

module.exports = app => {
  //FuncoesComuns.calculaCustoIdeal(6, 18);
  app.get('/', (req, res) => {
    res.send('Blog criado em Node.js<br>Kassio Sousa - 2023')
  });
  
  posts.routes(app);
  users.routes(app);
};