const db = require('../db-sequlize');
const Sequelize = require('sequelize');
var User = db.define('user',{
  name:{
    type:Sequelize.STRING
  },
  account:{
    type:Sequelize.STRING
  },
  password:{
    type:Sequelize.STRING
  }
},{
  freezeTableName:true
});

//User.sync();
console.log(user);

//module.export = User;
