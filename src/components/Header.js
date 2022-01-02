import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";
import "../Styles/HeaderStyle.css"

function Header() {
  return (
  
      <nav className="header-container">
        <Link className="btn-link" to="/">
          Chatty
        </Link>
  
          {auth().currentUser ? (
            <Fragment >
              <Link className="btn-link" to="/chat">
                Perfil
              </Link>
              <button
                className="btn-normal"
                onClick={() => auth().signOut()}
              >
                Logout
              </button>
            </Fragment>
          ) : (
            <Fragment >
              <Link className="btn-link" to="/login">
             Iniciar sesión
              </Link>
              <Link  className="btn-link" to="/signup">
                Registrar
              </Link>
            </Fragment>
          )}
  
      </nav>
  );
}

export default Header;