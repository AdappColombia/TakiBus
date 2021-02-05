import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfigSin from './firebaseConfig';
import PropTypes from 'prop-types';
import Loginadmin from './Loginadmin';
import {Link} from 'react-router-dom';


import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Container, makeStyles } from '@material-ui/core';







class SignIn extends Component {

    iniciarSesion = async () => {
     document.getElementById("inicia").click()
    alert()
  };


    render() {


        const {
            user,
            signOut,
            signInWithGoogle,
          } = this.props;


        return (
            <>
        
           
     

            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div >
              <Box mt={10}></Box>
              <Grid container
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
              <Avatar>
                  <LockOutlinedIcon />
                </Avatar>
                <Box mt={2}></Box>

                <Typography component="h1" variant="h5">
                  TakiBus
                </Typography>
              </Grid>


              <Box mt={4}></Box>


            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={signInWithGoogle}
            >
              Ingresar con Google
            </Button>

         
            <Box mt={2}></Box>

            <Grid container
         
            >
              <Grid item xs>
                
                <Link 
                  href="#" 
                  to="/admin"
                  variant="body2">
                  Ingreso Admin
                </Link>

              </Grid>
            </Grid>

          </div>
         
          </Container>
          
     
          </>
        );
    }
}
const firebaseAppAuth = firebaseConfigSin.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};



export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
  })(SignIn);
  