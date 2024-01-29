const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite');

const POSTS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS posts (
    pk_post INTEGER PRIMARY KEY AUTOINCREMENT,
    fk_tag INTEGER,
    fk_category INTEGER,
    title VARCHAR(50) NOT NULL,
    text VARCHAR(140),
    FOREIGN KEY(fk_tag) REFERENCES tags(id_tag),
    FOREIGN KEY(fk_category) REFERENCES categories(id_category)
  ) 
`;

const USUARIOS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS users (
    pk_user INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(40) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    pwdHash VARCHAR(255) NOT NULL
  )
`;
  
const TAGS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS tags (
    pk_tag INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(40) NOT NULL
  )
`;

const CATEGORIES_SCHEMA = `
  CREATE TABLE IF NOT EXISTS categories (
    pk_category INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(140) NOT NULL
  )
`;

db.serialize(() => {
  db.run('PRAGMA foreign_keys=ON');
  db.run(POSTS_SCHEMA);
  db.run(USUARIOS_SCHEMA);
  db.run(TAGS_SCHEMA);
  db.run(CATEGORIES_SCHEMA);

  db.each('SELECT * FROM users', (err, user) => {
    console.log('Users: ');
    console.log(user);
  });
});

process.on('SIGINT', () =>
  db.close(() => {
    process.exit(0);
  })
);

module.exports = db;
