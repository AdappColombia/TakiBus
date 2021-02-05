

import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfigSin from './firebaseConfig';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Swal from 'sweetalert2';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Container, makeStyles } from '@material-ui/core';



class Loginadmin extends Component {

  state = {
    data: [],

  };



    peticionGetAdmin = () => {


  


        var email = document.getElementById("email").value;
        var contra = document.getElementById("password").value;

        if(email!="" ||contra!=""){

              
        firebase.database().ref().child("admin").on("value", (canal) => {

    
          this.setState({ ...this.state.data, data: canal.val() });

          console.log()

          if((this.state.data.email == email ) && ( this.state.data.password== contra)){


            document.getElementById("adminApp").click()



          }else{
            Swal.fire(
              'Error',
              'correo o contraseña mal digitados',
              'error'
            )

          }

        });



        }else{
          Swal.fire(
            'Error',
            'Debe completar la información',
            'error'
          )
        }



   
    
      };



    render(){

        return (


          <>
      <Link  hidden class="nav-link"  id="adminApp"  to="/adminApp"   >Cerrar Sesión</Link>


      <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
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
     
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Correo Electrónico"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
          

                <Box mt={4}></Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {this.peticionGetAdmin()}}
       
      
                >
                  Iniciar Sesión
                </Button>

              

                <Box mt={1}></Box>
                <Grid container
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >


                <Link 
                  href="#" 
                  to="/"
                  variant="body2">
                  Volver a Usuarios
                </Link>
                </Grid>

                <Box mt={1}></Box>
                <Grid container
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >

                    
                     Inicio de sesión tipo administrador 
                </Grid>
     
            </div>
            <Box mt={8}>
             
            </Box>
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
  })(Loginadmin);
