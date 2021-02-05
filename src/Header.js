import React, { Component } from "react";
//import 'materialize-css/dist/css/materialize.min.css'
import Swal from 'sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";
import {Nav,  Navbar, NavDropdown,Form } from 'react-bootstrap';
import Home from './Home';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';







class Header extends Component {



    cerrarsesion = async () => {

        Swal.fire({
            title: 'Atención',
            text: "Desea cerrar sesión!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {


                document.getElementById("salir").click()

                

            }
        })


    };

    nav = async () => {


    }



    componentDidMount() {
  
        firebase.database().ref().child("usuarios").child(this.props.id_user).on("value", (canal) => {
  
          if (canal.val() == null) {
    


            const usuarios = {
              'id_usuario': this.props.id_user,
              'nombre_user': this.props.nombre,
              'email_user': this.props.email,
              'token_user': this.props.token,
              'foto_user': this.props.photo,
            };
  
  
  
            firebase.database().ref().child("usuarios").child(this.props.id_user).set(usuarios).then(newItem => {
            }).catch(err => {
              alert("error en la base de datos")
            });


          } 
        });



      }


    render() {

        const {
            user,
            signOut,
            signInWithGoogle,
          } = this.props;
        

        return (
            <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">Crud</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">Inicio <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Features</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Pricing</a>
                </li>
              </ul>

              
              <span class="navbar-nav">
             
                <a  href="#" class="nav-link"  onClick={() => this.cerrarsesion()}   >Cerrar Sesión</a>
                <a class="nav-link" hidden id="salir"  onClick={signOut}   >Cerrar Sesión</a>
         
              </span>
            </div>
          </nav>

   
            
            
            
            </>

        )
        
    }
}



const firebaseAppAuth = firebase.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Header);