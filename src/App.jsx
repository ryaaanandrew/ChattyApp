import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './Messages.jsx'
import NavBar from './NavBar.jsx'
import messages from './MessageList.json';
import { generateRandomId } from './utils.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages
    }
  }

//   addNewMessage = e => {
//     e.preventDefault();
//     const newMessage = {
//         username: this.state.username,
//         content: this.state.content,
//         id: generateRandomId()
//     }
//     const messages = this.state.messagesList.push(newMessage);
//     return this.setState = { messagesList: messages };
//   }

//   onChangeUsername = e => {
//     this.setState({username: e.target.value});
//   }

//   onChangeContent = e => {
//     this.setState({content: e.target.value});
// }

  addMessage = (e) => {
    if (e.key === "Enter") { 
      let messages = this.state.messages;
      const newMessage = {
        username: e.target.previousSibling.value,
        content: e.target.value,
        ID: generateRandomId()
      }
      messages.push(newMessage);
      this.setState(messages);
      e.target.value = '';
    }
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
            />
          </div>
    );
  }
}
export default App;
