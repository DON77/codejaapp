import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { browserHistory } from 'react-router';
import io from 'socket.io-client';
import configs from '../../app.config';
const socket = io(configs.apiIoUrl);

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      text: '',
      chats: []
    }
  }
  gteChat = () => {
    let guestToken = window.sessionStorage.getItem("guestToken");
    let chatId = window.sessionStorage.getItem("chatId");
    socket.emit('getChatMessages', {
        chatId: chatId,
        token: guestToken,
        limit: 10000,
        skip: 0,
    });
    socket.on('getChatMessages',(msg) => {
      this.setState({
        chats: msg.data
      })
    })
    
  }
  sendChat = () => {
    let message = this.state.text;
    let guestToken = window.sessionStorage.getItem("guestToken");
    let chatId = window.sessionStorage.getItem("chatId");
    if (message.length > 0) {
      socket.emit('newMessage', {
        chatId: chatId,
        token: guestToken,
        message
    });
    this.setState({
      text: ''
    })
    }    
  }

  componentWillMount() {
    if(window.sessionStorage.getItem("guestToken")) {
      this.gteChat();
    } else {
      browserHistory.push('/')
    }
  }
  
  updateScroll() {
    const el = this.refs.wrap;
    if(el) {
      el.scrollTop = el.scrollHeight;
    }
  }
  componentDidMount = () => {
    socket.on('newMessage', () => {
      this.gteChat();
      setTimeout(()=>this.updateScroll(), 500)
    });
    setTimeout(()=>this.updateScroll(), 500)
  }
  takeText(e) {
    let text = e.target.value;
    this.setState({
      text
    })
  }
  keyPress(e) {
    if(e.keyCode === 13){
      this.sendChat()
   }
  }
  deleteTokens() {
    window.sessionStorage.clear();
    browserHistory.push('/');
  }
  render() {
    let guestId = window.sessionStorage.getItem("guestId");    
    return (
      <div className="myAccount">
        <div className="myAccountContainer">
          <div className="container">
            <button className="btn btn-secondary" onClick={this.deleteTokens}>Log Out</button>
          </div>
          <div className="container chatBox">
            <div className="chatList" ref="wrap">
              {(this.state.chats.length > 0) && this.state.chats.map((item, i) => {
                return (<div className={`messageBox ${(item.from === guestId)? 'guest': 'client'}`} key={i}>
                          <div className="message">{item.message}</div>
                        </div>)
              })}
            </div>
            <div className='chatInputBox'>
              <div className="input-group">
                <input type="text" className="form-control" onKeyDown={(e) => this.keyPress(e)} onChange={(e) => this.takeText(e)} value={this.state.text} placeholder="Write..." aria-label="Write..." />
                <span className="input-group-btn">
                  <button className="btn btn-secondary" onClick={this.sendChat} type="submit">Send</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Chat;