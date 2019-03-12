import React, {Component} from 'react';
import messages from './messageList';
import { generateRandomId } from './utils';

function MessageItem(props) {
      return (
        <div>
            <div className="message">
                <span className="message-username">{props.message.username}</span>
                <span className="message-content">{props.message.content}</span>
            </div>
        </div>
      );
}

class Messages extends Component {

    constructor() {
        super();
        this.state = {
            messages
        };
    }

    componentDidMount() {
        setTimeout(() => {
            console.log("Simulating incoming message");
            // Add a new message to the list of messages in the data store
            const newMessage = {username: "Michelle", content: "Hello there!", ID: "asdasdqwdasdsa"};
            const messages = this.state.messages.concat(newMessage)
            // Update the state of the app component.
            // Calling setState will trigger a call to render() in App and all child components.
            this.setState({messages: messages})
          }, 3000);
      }

    render() {
        const messageItem = this.state.messages.map(message => {
           return <MessageItem message = {message} key={message.ID}/>
        });

        return (
            <main className="messages">
                {messageItem}
                <div className="message system">
                    Anonymous1 changed their name to nomnom.
                </div>
            </main>
        )
    }
}

export default Messages;