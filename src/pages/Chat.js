import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import Header from "../components/Header";
import "../Styles/ChatStyle.css"

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: "",
      readError: null,
      writeError: null,
      loadingChats: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) {
          return a.timestamp - b.timestamp;
        });
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }

  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
      });
      this.setState({ content: "" });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  render() {
    return (
      <div style={{textAlign:"center", justifyContent:"center"}}>
        <Header />
        <div className="container" ref={this.myRef}>
          {this.state.loadingChats ? (
            <div role="status">
              <span >Loading...</span>
            </div>
          ) : (
            ""
          )}
          <div className="chat-container">
          {this.state.chats.map((chat) => {
            return (
              <p
                key={chat.timestamp}
                className={
                  "chat-bubble-" +
                  (this.state.user.uid === chat.uid ? "current-user" : "normal")
                }
              >
                {chat.content}
                <br />
                <span>
                  {this.formatTime(chat.timestamp)}
                </span>
              </p>
            );
          })}
          </div>
        </div>
        <div>
        <form onSubmit={this.handleSubmit} className="mx-3">
          <textarea
            className="txt-area"
            name="content"
            onChange={this.handleChange}
            value={this.state.content}
          ></textarea>
          {this.state.error ? (
            <p className="text-danger">{this.state.error}</p>
          ) : null}
          <div>
          <button type="submit" className="btn-normal">
            Enviar
          </button>
          </div>
        </form>
        <div className="py-5 mx-3">
          Ingresó con:{" "}
          <strong className="text-info">{this.state.user.email}</strong>
        </div>
        </div>
      </div>
    );
  }
}