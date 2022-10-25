const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const Users = require('./users-model');

const { InvalidArgumentError } = require('../errors');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const blacklist = require('../../redis/config-blacklist');

function verifyUser(user) {
  if (!user) {
    throw new InvalidArgumentError('Não existe usuário com esse e-mail!');
  }
}

async function verifyTokenInBlacklist(token) {
  const tokenInBlacklist = await blacklist.haveToken(token);
  if (tokenInBlacklist) {
    throw new jwt.JsonWebTokenError('Token inválido por logout!');
  }
}

async function verifyPassword(pwd, pwdHash) {
  const validPwd = await bcrypt.compare(pwd, pwdHash);
  if (!validPwd) {
    throw new InvalidArgumentError('E-mail ou senha inválidos!');
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    async (email, password, done) => {
      try {
        const user = await Users.searchByEmail(email);
        verifyUser(user);
        await verifyPassword(password, user.pwdHash);

        done(null, user);
      } catch (erro) {
        done(erro);
      }
    }
  )
);

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        await verifyTokenInBlacklist(token);
        const payload = jwt.verify(token, process.env.CHAVE_JWT);
        const user = await Users.searchById(payload.id);
        done(null, usuario, { token: token });
      } catch (erro) {
        done(erro);
      }      
    }
  )
)
