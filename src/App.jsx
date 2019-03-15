import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './Messages.jsx'
import NavBar from './NavBar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { username: 'Anonymous'},
      messages: [],
      usersOnline: 0
    }
  }

  addMessage = (e) => {
    if (e.key === "Enter" && e.target.value) { 
      const newMessage = {
        type: "postMessage",
        username: e.target.previousSibling.value,
        content: e.target.value
      }
      const newUser = e.target.previousSibling.value;
      const addCurrentUser = { username: newUser}
      this.setState( {currentUser: addCurrentUser} )
      this.socket.send(JSON.stringify(newMessage))

      e.target.value = '';
    }
  }

  changeUsername = e => {
    const oldUser = this.state.currentUser.username;
    const newUser = e.target.value ? e.target.value : 'Anonymous'

    if(oldUser !== e.target.value) {
      this.setState( { currentUser: {username: newUser} } ) 
      const changeNotification = {
        type: 'postNotification',
        content: `${oldUser} has changed his name to ${e.target.value}`
      }
  
      this.socket.send(JSON.stringify(changeNotification))
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    
    this.socket.addEventListener('open', (e) => {
      console.log('Client connected...')
    });

    this.socket.addEventListener('message', (e) => {
      let message = JSON.parse(e.data)
      console.log('incoming message from server: ', message)
      if(!isNaN(message)) {
        this.setState( { usersOnline: message } )
      }
      this.setState({messages: [...this.state.messages, message] })
    });

    
  }

  render() {
    return ( 
          <div>
            <NavBar 
              usersOnline = {this.state.usersOnline}/>
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
