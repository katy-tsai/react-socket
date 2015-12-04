const React = require('react');
const ReactDOM = require('react-dom');
var io = require('socket.io-client') ;
var socket = io('http://localhost:3000');
var MessageList = React.createClass({
  getInitialState:function(){
    return {
      messages:[{
        timestamp:Date.now(),
        text:"welcome to the test chat app!"
      }]
    }
  },
  componentDidMount:function(){
    socket.on('messageAdded',this.onMessageAdded);
  },
  onMessageAdded:function(message){
    console.log(message);
    this.setState({
      messages:this.state.messages.concat(message)
    });
  },
  postIt:function(e){
    e.preventDefault();
    var input = ReactDOM.findDOMNode(this.refs.theForm).children[0];
    var message ={
      timestamp:Date.now(),
      text:input.value
    }
    this.setState({
      messages:this.state.messages.concat(message)
    });
      input.value ='';
      socket.emit('messageAdded',message);
  },
  render:function(){
    return (
      <div>
          <h2>Messages</h2>
          <ul className="message-list">
            {
              this.state.messages.map(function(message){
                return (
                  <li key={message.timestamp}>{message.text}</li>
                )
              })
            }
          </ul>
          <MessageForm submit={this.postIt} ref="theForm" />
      </div>
    )
  }
});

var MessageForm = React.createClass({
  render(){
    return (
      <form onSubmit={this.props.submit}>
          <input type="text" size="40"name="message" placeholder="type your message here"/>
          <button>Post it!</button>
      </form>
    )
  }
})

ReactDOM.render(
  <MessageList />
  ,document.getElementById('app')
);
