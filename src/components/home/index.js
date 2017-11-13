import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { browserHistory } from 'react-router';
import io from 'socket.io-client';
import configs from '../../app.config';
const socket = io(configs.apiIoUrl);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      domain: ''
    }
  }

  loginName(e) {
    let name = e.target.value;
    this.setState({
      name
    })
  }
  loginEmail(e) {
    let email = e.target.value;
    this.setState({
      email
    })
  }
  login(e) {
    e.preventDefault()
    const { email, name, domain } = this.state;
    socket.emit('getNewChat', {
        email: email,
        name: name,
        domain: domain
    });
    socket.on('getNewChat', (msg) => {
      if (msg.guestToken && msg.guestId && msg.chatId) {
        window.sessionStorage.setItem("guestToken", msg.guestToken);
        window.sessionStorage.setItem("guestId", msg.guestId);
        window.sessionStorage.setItem("chatId", msg.chatId);
        browserHistory.push('/chat')
      }    
    })
  }

  componentWillMount() {
    if(window.sessionStorage.getItem("guestToken")) {
      browserHistory.push('/chat')
    }
    
  }
  componentDidMount() {
    console.log(this.props);
    if (this.props && this.props.params && this.props.params.domain !== 'chat') {
      const { domain } = this.props.params;
      this.setState({
        domain
      })
    }
  }
  
  componentWillReceiveProps(nextProps) {
    
  }

  render() {
    console.log(this.props);
    console.log('state',this.state);
    return (
      <div className="myAccount">
        <div className="myAccountContainer">
          <div className="loginBox">
            <div className="container">
              <div className="loginContainer">
                <form className="form-signin" onSubmit={(e)=>this.login(e)} >
                  <input className="form-control" placeholder="Name" onChange={(e)=>this.loginName(e)} required="" type="text" />
                  <input className="form-control" placeholder="Email" onChange={(e)=>this.loginEmail(e)} required="" type="email" />
                  <button className="btn btn-lg btn-primary btn-block" onSubmit={(e)=>this.login(e)} type="submit">Send</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Home;