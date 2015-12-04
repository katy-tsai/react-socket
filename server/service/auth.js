const User = require('../model/User');
const EventEmitter = require('events').EventEmitter;;
const util = require('util');

var Auth = function(){
  EventEmitter.call(this);
  this.login = function(loginUser){
    this.emit("userLogin",loginUser);
  }

  var _validate = function(loginUser){
    if(loginUser.account){
      if(loginUser.password){
        this.emit('authentication',loginUser);
      }else{
          this.emit('errormsg','password is null');
      }
    }else{
        this.emit('errormsg','account is null');
    }
  }

  var _authentication = function(loginUser){
    console.log(User);
    User.findOne({where:loginUser}).then(function (entity) {
      console.log(entity);
    });
    // User.findOne({where:loginUser}).then(function (user) {
    //   console.log(user);
    //     if(user){
    //       this.emit('success',user);
    //     }else{
    //         this.emit('errormsg','password is error');
    //     }
    // },function(error){
    //     this.emit('errormsg',error);
    // });
  }
  this.on('userLogin',_validate);
  this.on('authentication',_authentication);

}
util.inherits(Auth,EventEmitter);

module.exports = new Auth();
