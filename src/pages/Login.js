import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import Header from "../components/Header";
import { signin, signInWithGoogle } from "../helpers/auth";
import "../Styles/LoginStyle.css"

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <Fragment>
        <Header></Header>
      <div className="container">
        <form
          className="mt-5 py-5 px-5"
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <h1>
            Ingresar a 
            <Link className="btn-link" to="/">
              Chatty
            </Link>
          </h1>
          <p className="p-mensaje">
            Ingrese los campos
                      </p>
          <div>
            <input
              className="input-box"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div >
            <input
              className="input-box"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <div className="form-group">
            {this.state.error ? (
              <p className="text-danger">{this.state.error}</p>
            ) : null}
            <button className="btn-normal" type="submit">
              Login
            </button>
          </div>
          <p>Puedes loguearte con Google</p>
          <div className="form-group">
          <button
            className="btn-normal"
            type="button"
            onClick={this.googleSignIn}
          >
            Iniciar con google
          </button>
          </div>
          <hr />
          <p>
            ¿No tienes una cuenta? <Link className="btn-link" to="/signup">Registrarse</Link>
          </p>
        </form>
      </div>
      </Fragment>
    );
  }
}