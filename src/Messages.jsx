import React, {Component} from 'react';

function MessageItem(props) {
      return (
        <div>
            <div className="message" key=''>
                <span className="message-username">{props.message.username}</span>
                <span className="message-content">{props.message.content}</span>
            </div>
        </div>
      );
}

class Messages extends Component {

    constructor() {
        super();
    }

    render() {
        const messageItem = this.props.messages.map(message => {
           return <MessageItem message = {message} key={message.ID}/>
        });

        return (
            <main className="messages">
                {messageItem}
            </main>
        )
    }
}

export default Messages;