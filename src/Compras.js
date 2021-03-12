import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth';
import firebase from './firebaseConfig';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Swal from 'sweetalert2';



class Compras  extends Component {
    state = {
        data: [],
        login: [],
        flotas:[],
        compra:[],
        comprapersona:[],
        comprapuestos:[],
        usuarios:'',
      
        modalInsertar: false,
        modalEditar: false,



        form: {
          Apellido: '',
          Correo: '',
          Nombre: '',
          NumeroContacto: '',
          NumeroDocumento: '',
          TipoDocumento: '',
        },
    
        id: 0
      };



 
      peticionComprasPersonas = () => {


   
        
    
      }


      peticionComprasPuestos = () => {
  
        firebase.database().ref().child("compra_puestos").child("puestos").on("value", (canal) => {
    
          if (canal.val() !== null) {
    
            
            this.setState({ ...this.state.comprapuestos, comprapuestos: canal.val() });

    
          } else {
    
            this.setState({ comprapuestos: [] });
    
          }
        });

   
    
      };


      peticionCompras = () => {
  
        firebase.database().ref().child("compra").on("value", (canal) => {
    
          if (canal.val() !== null) {
    

            this.setState({ ...this.state.compra, compra: canal.val() });




    
          } else {
    
            this.setState({ compra: [] });
    
          }
        });

   
    
      };




      peticionGetFlotas = () => {
  
        firebase.database().ref().child("compra").on("value", (canal) => {
    
          if (canal.val() !== null) {
    
            this.setState({ ...this.state.flotas, flotas: canal.val() });
    
          } else {
    
            this.setState({ flotas: [] });
    
          }
        });
    
      };
    
    
    
    
      peticionGet = () => {
    
        firebase.database().ref().child("canales").on("value", (canal) => {
    
          if (canal.val() !== null) {
    
            this.setState({ ...this.state.data, data: canal.val() });
    
          } else {
    
            this.setState({ data: [] });
    
          }
        });
    
      };
    
      peticionPost = () => {
    
        firebase.database().ref().child("canales").push(this.state.form,
          error => {
            if (error) console.log(error)
          });
          
        this.setState({ modalInsertar: false });
    
      }
    
      peticionPut = () => {
    
        firebase.database().ref().child(`canales/${this.state.id}`).set(
          this.state.form,
          error => {
            if (error) console.log(error)
          });
        this.setState({ modalEditar: false });
    
      }
    
      peticionDelete = () => {
    
        if (window.confirm(`Estás seguro que deseas eliminar el canal ${this.state.form && this.state.form.canal}?`)) {
          firebase.database().ref().child(`canales/${this.state.id}`).remove(
            error => {
              if (error) console.log(error)
            });
        }
    
      }
    
      handleChange = e => {
    
        this.setState({
          form: {
            ...this.state.form,
            [e.target.name]: e.target.value
          }
        })
        console.log(this.state.form);
    
      }
    
      seleccionarCanal = async (canal, id, caso) => {
    
        await this.setState({ form: canal, id: id });
    
        (caso === "Editar") ? this.setState({ modalEditar: true }) :
          this.peticionDelete()
    
      }


      seleccionarTitular = async (cedula) => {
    
    
        
        firebase.database().ref().child("compra").child(cedula).on("value", (canal) => {
    
          if (canal.val() !== null) {
    
            
            this.setState({ ...this.state.comprapersona, comprapersona: canal.val() });

    
          } else {
    
            this.setState({ comprapersona: [] });
    
          }
        });

      }
    
    
      componentDidMount() {


        this. peticionComprasPersonas();
        this.peticionComprasPuestos();
        this.peticionCompras();
        this.peticionGetFlotas();
        this.peticionGet();


      }
    



    render(){

        return(
            <>
        
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Cedula</th>
                  <th>Fecha Viaje</th>
                  <th>Hora Viaje</th>
                  <th>Ruta</th>
                  <th>Puesto</th>
                  <th>Valor</th>
                  <th>Opciones</th>

                </tr>
              </thead>
              <tbody>
                {Object.keys(this.state.comprapuestos).map(i => {
                  // console.log(i);
                  return <tr key={i}>
                    <td>{this.state.comprapuestos[i].cedula}</td>
                    <td>{this.state.comprapuestos[i].fecha_viaje}</td>
                    <td>{this.state.comprapuestos[i].hora_viaje}</td>
                    <td>{this.state.comprapuestos[i].id_pre_compra}</td>
                    <td>{this.state.comprapuestos[i].puesto}</td>
                    <td>{"$"+  new Intl.NumberFormat().format(this.state.comprapuestos[i].val_puesto)}</td>

    
             

                    <td>

                      
              
                      <button  onClick={() => this.seleccionarTitular(this.state.comprapuestos[i].cedula)} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Titular</button>

                    </td>
  
                  </tr>
                })}
  
  
              </tbody>
            </table>
  
  
  
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">Titular reserva</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-3">

                  <form>
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">Nombres:</label>
                      <input disabled type="text" class="form-control" id="recipient-name" value={this.state.comprapersona.Nombre}></input>
                    </div>

                    <div class="mb-3">
                      <label for="message-text" class="col-form-label">Apellidos:</label>
                      <input disabled type="text" class="form-control" id="recipient-name" value={this.state.comprapersona.Apellido}></input>
                    </div>

                    <div class="mb-3">
                      <label for="message-text" class="col-form-label">No Docuemento:</label>
                      <input disabled type="text" class="form-control" id="recipient-name" value={this.state.comprapersona.NumeroDocumento}></input>
                    </div>

                    <div class="mb-3">
                      <label for="message-text" class="col-form-label">Tipo Docuemento:</label>
                      <input disabled type="text" class="form-control" id="recipient-name" value={this.state.comprapersona.TipoDocumento}></input>
                    </div>

                    <div class="mb-3">
                      <label for="message-text" class="col-form-label">Correo:</label>
                      <input disabled type="text" class="form-control" id="recipient-name" value={this.state.comprapersona.Correo}></input>
                    </div>

                    <div class="mb-3">
                      <label for="message-text" class="col-form-label">Contacto:</label>
                      <input disabled type="text" class="form-control" id="recipient-name" value={this.state.comprapersona.NumeroContacto}></input>
                    </div>

                  </form>

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>


            
          </>
        );

    }

}

export default Compras;




