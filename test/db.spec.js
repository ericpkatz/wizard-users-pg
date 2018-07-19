const expect = require('chai').expect;
const db = require('../db');

describe('db', ()=> {
  let userMap = {};
  beforeEach(async()=>{
    try{
      await db.syncAndSeed();
    }
    catch(ex){
      throw ex;
    }
  });
  beforeEach(async()=> {
    try{
      const users = await db.getUsers();
      userMap = users.reduce((memo, user)=> {
        memo[user.name] = user;
        return memo;
      }, {});
    }
    catch(ex){
      throw ex;
    }
  });
  describe('getUsers', ()=> {
    it('can find users', ()=> {
      expect(userMap.moe.name).to.equal('moe');
    }); 
  });
  describe('getUser', ()=> {
    it('returns a user by id', async()=>{
      try{
        const moe = await db.getUser(userMap.moe.id);
        expect(moe.name).to.equal('moe');
      }
      catch(ex){
        throw ex;
      }
    });
  });
});
