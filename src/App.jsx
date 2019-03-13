import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './Messages.jsx'
import NavBar from './NavBar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: ''},
      messages: []
    }
  }

  addMessage = (e) => {
    if (e.key === "Enter") { 
      const newMessage = {
        username: e.target.previousSibling.value,
        content: e.target.value
      }
      const newUser = e.target.previousSibling.value;
      const addCurrentUser = { name: newUser}
      this.setState( {currentUser: addCurrentUser} )
      this.socket.send(JSON.stringify(newMessage))

      e.target.value = '';
    }
  }

  changeUsername = (e) => {
    if (e.key === "Enter") { 
      alert('username changed')
      // const newMessage = {
      //   username: e.target.previousSibling.value,
      //   content: e.target.value
      // }
      // this.socket.send(JSON.stringify(newMessage))
      // e.target.value = '';
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    
    this.socket.addEventListener('open', (e) => {

    });

    this.socket.addEventListener('message', (e) => {
      let message = JSON.parse(e.data)
      console.log(message)
      this.setState({messages: [...this.state.messages, message] })
    });

    
  }

  render() {
    return ( 
          <div>
            <NavBar />
            <MessageList 
              messages = {this.state.messages}
              />
            <ChatBar 
              addMessage = {this.addMessage}
              changeUsername = {this.changeUsername}
            />
          </div>
    );
  }
}
export default App;
