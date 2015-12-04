const React =require('react');
const update = require('react/lib/update');
const ReactDOM = require('react-dom');
var io = require('socket.io-client') ;
var socket = io('http://localhost:3000');

var LoginForm = React.createClass({
  getInitialState:function(){
    return {
      user:{account:"",password:""},
      isError:false,
      errorMessage:null
    }
  },
  componentDidMount:function(){
    socket.on('login',this.userLogin);
    socket.on('hasError',this.dealwithError);
  },
  userLogin:function(user){
    var state = this.state;

    var newState = update(state,{
      user:{$set:user}
    })
    this.setState(newState);
  },
  dealwithError:function(error){
    var state = this.state;
    var newState = update(state,{
      isError:{$set:true},
      errorMessage:{$set:error}
    })
    console.log(newState);
    this.setState(newState);
  },
  loginSubmit:function(e){
    e.preventDefault();
    socket.emit('login',this.state.user);
  },
  render:function(){
    var isError = this.state.isError;
    var errorMessage = this.state.errorMessage;
    const errprSpan= <span>errorMessage</span>;

    return (
      <form onSubmit={this.loginSubmit}>
          <input type="text"  placeholder="account" onFocus={this._handleFocus} onChange={this._handleChange.bind(this,'account')}/><br />
          <input type="password"  placeholder="password" onFocus={this._handleFocus} onChange={this._handleChange.bind(this,'password')}/><br />
          {isError?errprSpan:""}<br/>
          <button>submit</button>
      </form>
    )
  },

  _handleChange(name,e){
    var state = this.state;
    var user = this.state.user;
    user[name]=e.target.value;
    var newState = update(state,{
      user:{$set:user}
    })
    console.log(newState);
    this.setState(newState);
  },
  _handleFocus(e){
    var state = this.state;
    var newState = update(state,{
      isError:{$set:false},
      errorMessage:{$set:""}
    })
    console.log(newState);
    this.setState(newState);
  }

})
ReactDOM.render(
  <LoginForm />
  ,document.getElementById('app')
);
