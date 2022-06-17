const { Client } = require('pg');
const client = new Client({
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  host: process.env.host,
  port: process.env.dbport,
});
client.on('connect', () => {
  console.log('Database connected.');
});
console.log(process.env.dbport)
module.exports = client;
