const express = require('express');
const db = require('./db');

const app = express();

module.exports = app;

app.get('/', async(req, res, next)=> {
  try{
    const users = await db.getUsers();
    res.send(users);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/users/:id', async(req, res, next)=> {
  try{
    const user = await db.getUser(req.params.id);
    res.send(user);
  }
  catch(ex){
    next(ex);
  }
});
