const pg = require('pg');
const { Client } = pg;

const client = new Client(process.env.DATABASE_URL);
client.connect();

const syncAndSeed = async()=> {
  const sql = `
    DROP TABLE IF EXISTS users;
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      name varchar(255)
    );
    INSERT INTO users(name) values ('moe');
    INSERT INTO users(name) values ('larry');
    INSERT INTO users(name) values ('curly');
  `;
  try {
    await client.query(sql);
  }
  catch(ex){
    throw ex;
  }
}

const getUsers = async()=> {
  try {
    const response = await client.query('select * from users');
    return response.rows;
  }
  catch(ex){
    throw ex;
  }
};

const getUser = async(id)=> {
  try {
    const response = await client.query('select * from users where id = $1', [id]);
    if(!response.rows.length){
      throw new Error('user with that id does not exist');
    }
    return response.rows[0];
  }
  catch(ex){
    throw ex;
  }
};

module.exports = {
  syncAndSeed,
  getUsers,
  getUser
};

