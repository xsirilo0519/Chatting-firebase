import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Fragment } from "react/cjs/react.production.min";
import { signup, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

export default class SignUp extends Component {
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
      await signup(this.state.email, this.state.password);
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
        <form className="mt-5 py-5 px-5" onSubmit={this.handleSubmit}>
          <h1>
            Registrarse a
            <Link className="btn-link" to="/">
              Chatty
            </Link>
          </h1>
          <p className="p-mensaje">Completa los campos para registrarte.</p>
          <div >
            <input
              className="input-box"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            ></input>
          </div>
          <div>
            <input
               className="input-box"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            ></input>
          </div>
          <div className="form-group">
            {this.state.error ? (
              <p className="text-danger">{this.state.error}</p>
            ) : null}
            <button className="btn-normal" type="submit">
              Registrar
            </button>
          </div>
          <p>Tu puedes entre por medio del servicio de google</p>
          <div className="form-group">
            <button
              className="btn-normal"
              type="button"
              onClick={this.googleSignIn}
            >
              Ingresar con google
            </button>
          </div>
          <hr></hr>
          <p>
          ¿Ya tienes una cuenta? <Link className="btn-link" to="/login">Login</Link>
          </p>
        </form>
      </div>
      </Fragment>
    );
  }
}
