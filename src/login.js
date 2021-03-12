import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import Home from './Home';
import Header from './Header';
import Loginformulario from './Loginformulario';
import "bootstrap/dist/css/bootstrap.min.css";
import Signin from './SignIn';





class Login extends Component {


    render() {

      const {
        user,
        signOut,
        signInWithGoogle,
      } = this.props;
      

      return (
        <>



            {

              user
              ? <><Header nombre={user.displayName} id_user={user.uid} email={user.email} photo={user.photoURL} token={user.refreshToken}/> {console.log(user)} </>
              : <div></div>

            }
  
            {
              user
                ? <div></div>
                : <Signin/>

            }

        </>
      );
    }
  }


const firebaseAppAuth = firebaseConfig.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Login);
