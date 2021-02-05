import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth';
import firebase from './firebaseConfig';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Swal from 'sweetalert2';



class Formcotizador extends Component {
    state = {
      data: [],
      login: [],
      flotas:[],
      usuarios:'',
    
      modalInsertar: false,
      modalEditar: false,
      form: {
        canal: '',
        idioma: '',
        pais: '',
        suscriptores: ''
      },
  
      id: 0
    };
  
  
  
    peticionGetFlotas = () => {
  
      firebase.database().ref().child("flotas").on("value", (canal) => {
  
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
  
  
    componentDidMount() {
  
      this.peticionGetFlotas();
      this.peticionGet();
    }
  
  

  
    render() {
    //  let idUsuarios = this.props.cat
      return (
  
        <>
        






        <div class="card">
            <div class="card-body">
            <div class="container">
                <div class="row d-flex justify-content-center">
            <div class="col">
            <label for="a" class="form-label text-muted">Origen</label>   
            <select class="form-select" aria-label="Default select example" id="a">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            </div>
            <div class="col">




            <label for="d" class="form-label text-muted">Destino</label>
            <select class="form-select" aria-label="Default select example" id="d">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>


            </div>
            <div class="col">
                <label for="b" class="form-label text-muted">Fecha de viaje</label>
                <input class="form-control mb-3" type="date"  id="example-date-input" id="b"></input>
            </div>
            <div class="col ">
       
                <br></br>
                <button class="btn btn-lg btn-warning" type="submit" id="n"> Buscar Bus</button>

            </div>
          </div>
                </div>
            </div>
        </div>

         

            <br></br>


          <div class="form-select form-select-lg mb-3">


            <label for="example-date-input" class="col-2 col-form-label">Date</label>
            <div class="col-2">
              <input class="form-control" type="date"  id="example-date-input"></input>
            </div>


            
          </div>






          <select class="form-select" aria-label="Default select example">
            <option selected disabled>Lista...</option>
            {Object.keys(this.state.flotas).map(i => {
       
                // console.log(i);
                //  console.log(this.state.flotas[i].nombre);
    
                return<option value={this.state.flotas[i].nombre}>{this.state.flotas[i].nombre}</option>
     
             })}
           
          </select>


      




  
          <div class="mb-3">
                <br />
                    <button className="btn btn-success" onClick={() => this.setState({ modalInsertar: true })}>Insertar</button>
                <br />
                <br />
             </div>
            
  
  
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Canal</th>
                  <th>Idioma</th>
                  <th>País</th>
                  <th>Suscriptores (en millones)</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.state.data).map(i => {
                  // console.log(i);
                  return <tr key={i}>
                    <td>{this.state.data[i].canal}</td>
                    <td>{this.state.data[i].idioma}</td>
                    <td>{this.state.data[i].pais}</td>
                    <td>{this.state.data[i].suscriptores}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => this.seleccionarCanal(this.state.data[i], i, 'Editar')}>Editar</button> {"   "}
                      <button className="btn btn-danger" onClick={() => this.seleccionarCanal(this.state.data[i], i, 'Eliminar')}>Eliminar</button>
                    </td>
  
                  </tr>
                })}
  
  
              </tbody>
            </table>
  
  
  
            
  
  
            <Modal isOpen={this.state.modalInsertar}>
  
              <ModalHeader>Insertar Registro</ModalHeader>
              <ModalBody>
  
                <div className="form-group">
                  <label>Canal: </label>
                  <br />
                  <input type="text" className="form-control" name="canal" onChange={this.handleChange} />
                  <br />
                  <label>País: </label>
                  <br />
                  <input type="text" className="form-control" name="pais" onChange={this.handleChange} />
                  <br />
                  <label>Idioma: </label>
                  <br />
                  <input type="text" className="form-control" name="idioma" onChange={this.handleChange} />
                  <br />
                  <label>Cantidad de Suscriptores (millones): </label>
                  <br />
                  <input type="text" className="form-control" name="suscriptores" onChange={this.handleChange} />
                </div>
  
              </ModalBody>
              <ModalFooter>
  
                <button className="btn btn-primary" onClick={() => this.peticionPost()}>Insertar</button>{"   "}
                <button className="btn btn-danger" onClick={() => this.setState({ modalInsertar: false })}>Cancelar</button>
  
              </ModalFooter>
              
            </Modal>
  
  
  
            <Modal isOpen={this.state.modalEditar}>
              <ModalHeader>Editar Registro</ModalHeader>
              <ModalBody>
                <div className="form-group">
                  <label>Canal: </label>
                  <br />
                  <input type="text" className="form-control" name="canal" onChange={this.handleChange} value={this.state.form && this.state.form.canal} />
                  <br />
                  <label>País: </label>
                  <br />
                  <input type="text" className="form-control" name="pais" onChange={this.handleChange} value={this.state.form && this.state.form.pais} />
                  <br />
                  <label>Idioma: </label>
                  <br />
                  <input type="text" className="form-control" name="idioma" onChange={this.handleChange} value={this.state.form && this.state.form.idioma} />
                  <br />
                  <label>Cantidad de Suscriptores (millones): </label>
                  <br />
                  <input type="text" className="form-control" name="suscriptores" onChange={this.handleChange} value={this.state.form && this.state.form.suscriptores} />
                </div>
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-primary" onClick={() => this.peticionPut()}>Editar</button>{"   "}
                <button className="btn btn-danger" onClick={() => this.setState({ modalEditar: false })}>Cancelar</button>
              </ModalFooter>
            </Modal>
            
          </>
      );
    }
  }
  
  
  
  
  
  
  export default Formcotizador;