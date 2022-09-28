const posts = require('./src/posts');
const usuarios = require('./src/usuarios');
const FuncoesComuns = require('./src/funcoes-comuns');

module.exports = app => {
  //FuncoesComuns.calculaCustoIdeal(6, 18);
  app.get('/', (req, res) => {res.send('Blog criado em Node.js<br>Kassio Sousa - 2022')});
  
  posts.rotas(app);
  usuarios.rotas(app);
};