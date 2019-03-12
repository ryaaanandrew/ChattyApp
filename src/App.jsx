import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Messages from './Messages.jsx'
import NavBar from './NavBar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: false});
    }, 3000)
  }

  render() {
    if(this.state.loading === true) {
      return (
        <h1>loading...</h1>
      );
    } else {
    return ( <div>
        <NavBar />
        <Messages />
        <ChatBar />
      </div>);
    }
  }
}
export default App;
