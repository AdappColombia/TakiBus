import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfigLogin from './firebaseConfig';
import "bootstrap/dist/css/bootstrap.min.css";



class FormularioLogin extends Component {
    render() {

        const {
            user,
            signOut,
            signInWithGoogle,
          } = this.props;


        return (
            <div className="Formulariologin">



                <button onClick={signInWithGoogle }>Sign in with Google</button>

                

            </div>


        );
    }

}

const firebaseAppAuth = firebaseConfigLogin.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
  })(FormularioLogin);
  