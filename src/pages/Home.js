import React, { Component } from "react";
import Header from "../components/Header";
import "../Styles/HomeStyle.css"
import { Link } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";

export default class HomePage extends Component {
  render() {
    return (
      <Fragment>
          <Header />
      <div className="container">
        <section>
          <div className="jumbotron__jumbotron-fluid-py-5">
            <div className="container__text-center-py-5">
              <h1 className="display-4">Bienvenido a Chatty</h1>
              <p className="lead">
                Un lugar para hablar
              </p>
              <div className="container-btn">
                <Link className="btn-link" to="/signup">
                  Create New Account
                </Link>
                <Link className="btn-link"  to="/login">
                  Login to Your Account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      </Fragment>
    );
  }
}