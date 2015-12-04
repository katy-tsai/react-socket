var Sequelize = require('Sequelize');

var sequelize = new Sequelize('cec','root','admin',{
  host:'localhost',
  dialect:'mysql',
  pool:{
    max:5,
    min:0,
    idle:10000
  }
});

module.exports = sequelize;
