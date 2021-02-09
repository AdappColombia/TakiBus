import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth';
import firebase from './firebaseConfig';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ContactSupportOutlined } from '@material-ui/icons';
import moment from "moment";
import continental from './imagenes/conti.png';
import bolivariano from './imagenes/bol.jpeg';

import './Formcotizador.css'

class Formcotizador extends Component {

  
    state = {
      data: [],
      login: [],
      flotas:[],
      rutas:[],
      origen:[],
      viaje:[],
      fecha:[],
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
  
  
  



    formatCurrency=(locales, currency, fractionDigits, number)=> {

      var formatted = new Intl.NumberFormat(locales, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: fractionDigits
      }).format(number);
      return formatted;

    }




    peticionViaje = (origen,destino) => {
      this.setState({ viaje: [] });




      switch(origen+" "+destino){


        case "Ipiales Bogotá":


          firebase.database().ref().child("viaje").child("Ipi-Bog").on("value", (canal) => {
  
            if (canal.val() !== null) {
    
              this.setState({ ...this.state.viaje, viaje: canal.val() });
      
            } else {
      
              this.setState({ viaje: [] });
      
            }
          });

          break;


          case "Ipiales Cali":


            firebase.database().ref().child("viaje").child("Ipi-Cal").on("value", (canal) => {
    
              if (canal.val() !== null) {
      
                this.setState({ ...this.state.viaje, viaje: canal.val() });
        
              } else {
        
                this.setState({ viaje: [] });
        
              }
            });
  
            break;



            
          case "Ipiales Medellin Sur":


            firebase.database().ref().child("viaje").child("Ipi-Med").on("value", (canal) => {
    
              if (canal.val() !== null) {
      
                this.setState({ ...this.state.viaje, viaje: canal.val() });
        
              } else {
        
                this.setState({ viaje: [] });
        
              }
            });
  
            break;


          case "Bogotá Ipiales":

        
          firebase.database().ref().child("viaje").child("Bog-Ipi").on("value", (canal) => {
  
            if (canal.val() !== null) {
    
              this.setState({ ...this.state.viaje, viaje: canal.val() });
      
            } else {
      
              this.setState({ viaje: [] });
      
            }
          });

          break;





          case "Cali Ipiales":

        
            firebase.database().ref().child("viaje").child("Cal-Ipi").on("value", (canal) => {
    
              if (canal.val() !== null) {
      
                this.setState({ ...this.state.viaje, viaje: canal.val() });
        
              } else {
        
                this.setState({ viaje: [] });
        
              }
            });
  
            break;

            case "Medellin Sur Ipiales":

        
              firebase.database().ref().child("viaje").child("Med-Ipi").on("value", (canal) => {
      
                if (canal.val() !== null) {
        
                  this.setState({ ...this.state.viaje, viaje: canal.val() });
          
                } else {
          
                  this.setState({ viaje: [] });
          
                }
              });
    
              break;



      }

     
    };




  
    peticionGet = (origen,destino) => {

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


    buscar = async () => {

      var origen = document.getElementById("origen").value;
      var destino  = document.getElementById("destino").value;
      var fecha = document.getElementById("fecha").value; 






     if(origen!="Seleccione su origen"){
        if(destino != "Selecciones destino"){


        if(fecha){

            
            this.setState({ ...this.state.fecha, fecha: fecha });

            this.peticionViaje(origen,destino);



        }else{

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debe escoger una fecha de viaje',
        
          })
        }
       



       }else{

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debe escoger su destino',
      
        })
       }



     }else{



      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe escoger su origen',
    
      })


     }

     

  

    }



    peticionGetRutas = () => {



      let date = new Date()

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      
      console.log(year+"/"+month+"/"+day)
      




      firebase.database().ref().child("origen").on("value", (canal) => {
  
        if (canal.val() !== null) {
  

          this.setState({ ...this.state.origen, origen: canal.val() });
  
        } else {
  
          this.setState({ origen: [] });
  
        }
      });


  
      firebase.database().ref().child("rutas").on("value", (canal) => {
  
        if (canal.val() !== null) {
  

          this.setState({ ...this.state.rutas, rutas: canal.val() });
  
        } else {
  
          this.setState({ rutas: [] });
  
        }
      });
  
    };



    destino = async () => {
      var origen =  document.getElementById("origen").value



      this.setState({ destinoform: origen });




     /* firebase.database().ref().child("rutas").on("value", (canal) => {



      

        if(origen!="Seleccione su origen"){

                if (canal.val() !== null) {


                




                  
                 {Object.keys(this.state.rutas).map(i => {
       

                  if(this.state.rutas[i].origen ==origen){

                      var destinof = this.state.rutas[i].destino 


                   console.log(canal.val())

                   this.setState({ ...this.state.destinoform, destinoform: canal.val()});
    
                      
                      
                  }
                 
                 })}



                } else {
  
                     this.setState({ rutas: [] });
  
                }
        }
      })*/



    }
  
  
    componentDidMount() {


      



  
      this.peticionGetRutas();
      this.peticionGetFlotas();
     
    }
  
 

  
    render() {
    //  let idUsuarios = this.props.cat
      return (
  
        <>
        
        <div className="container buscador p-1">
          <div className="card p-3">
            <div className="row ">
              <div className="col-md-3 col-sm-6">
                <label for="origen" className="form-label text-muted">Origen</label> 
                
                <select id="origen" name="origenes" className="form-select" aria-label="Default select example" onClick={() => this.destino()} required>
                  <option value="" disabled  selected>Seleccione Ruta Origen</option>
                  {Object.keys(this.state.origen).map(i => {
       
                      return<option value={this.state.origen[i].origen}>{this.state.origen[i].origen}</option>

                  })}
                </select>
              </div>

              <div className="col-md-3 col-sm-6">
                <label for="destino" className="form-label text-muted">Origen</label> 
                <select id="destino" className="form-select" aria-label="Default select example">
                  <option value="" disabled selected >Seleccione Ruta Destino</option>
                  {Object.keys("1").map(i => {
       
                    switch(this.state.destinoform){
                        case "Ipiales":
                          return (
                            <>
                                  <option value="Bogotá">Bogotá</option>
                                  <option value="Cali">Cali</option>
                                  <option value="Medellin Sur">Medellin Sur</option>
                            </>                     
                                  );
                          break;
                          case "Bogotá":
                            return (
                              <>
                                    <option value="Ipiales">Ipiales</option>                    
                              </>                       
                                    );
                            break;
                            case "Cali":
                              return (
                                <>
                                      <option value="Ipiales">Ipiales</option>                     
                                </>                          
                                      );
                              break;
                              case "Medellin Sur":
                                return (
                                  <>
                                        <option value="Ipiales">Ipiales</option>                        
                                  </>                            
                                        );
                                break;
                    }

                  })}
                </select>
              </div>

              <div className="col-md-3  ">
                <label for="fecha" className="form-label text-muted">Fecha de viaje</label>
                <input class="form-control" type="date" id="fecha"></input>
                
              </div>

              <div className="col-md-3  text-center">
                <br></br>
                <button id="buscar" type="submit" className="btn btn-lg btn-warning" onClick={() => this.buscar()}>Buscar Bus</button>
              </div>

            </div>
          </div>
        </div>
        <br></br>



          <select class="form-select" aria-label="Default select example">
            <option selected disabled>Lista...</option>
            {Object.keys(this.state.flotas).map(i => {
       
                // console.log(i);
                //  console.log(this.state.flotas[i].nombre);
    
                return<option value={this.state.flotas[i].nombre}>{this.state.flotas[i].nombre}</option>
     
             })}
           
          </select>


      
         
          <br></br>



          <div class="card">
            <div class="card-body">
              
          <div class="mb-3">
                <br />
                    <button className="btn btn-success" onClick={() => this.setState({ modalInsertar: true })}>Insertar</button>
                <br />
                <br />
             </div>


                
             <div className="container resultados">
            <div className="row titulos">
            {/* <div className="">               */}
              <ul class="list-group list-group-horizontal p-0">
                <li class="list-group-item col-md-2 col-sm-2 text-center"><a href="#">Terminal</a></li>
                <li class="list-group-item col-md-2 col-sm-2 text-center">Hora Salida</li>
                <li class="list-group-item col-md-2 col-sm-2 text-center">Cantidad</li>
                <li class="list-group-item col-md-2 col-sm-2 text-center">Precio</li>
                <li class="list-group-item col-md-2 col-sm-2 text-center ">Opciones</li>
                <li class="list-group-item col-md-2 col-sm-2 text-center ">Opciones</li>
              </ul>           
            {/* </div> */}
            </div>
           

            {Object.keys(this.state.viaje).map(i => {              
            return <div className="listahorario mx-1">
            <div className="row my-2 p-2">
              <div className="col-md-2 col-sm-2 text-center">             
                {
                  this.state.viaje[i].tipo_bus=="2G"? <img width="200px" src={bolivariano}></img>:   
                  this.state.viaje[i].tipo_bus=="2G Gold"? <img width="200px" src={bolivariano}></img>:<img width="200px" src={continental}></img>
                }
              </div>

              <div className="col-md-2 col-sm-2 text-center">
                {"Salida: "+this.state.viaje[i].horario}
                {<br></br>}
                {"Duracion: "+this.state.viaje[i].duracion}
              </div>

              <div className="col-md-2 col-sm-2 text-center border-end ">
                {this.state.viaje[i].tipo_bus}
              </div>

              <div className="col-md-2 col-sm-2">
               {this.state.viaje[i].terminal_salida}
              </div>
              
              <div className="col-md-2 col-sm-2">
               {this.state.viaje[i].terminal_llegada}
              </div>
              
              <div className="col-md-2 col-sm-2 text-center "> 
              	{"$"+ this.state.viaje[i].valor }
                {<br></br>}
                <p>
                  <button className="btn btn-primary" type="button" data-bs-toggle="collapse" 
                  data-bs-target={"#c"+this.state.viaje[i].nodo } aria-expanded="false" aria-controls="collapseExample
                  onClick={() => this.seleccionarCanal(this.state.viaje[i], i, 'Editar')}">
                    Selecionar Silla
                  </button>
                  {"   "}
                </p>           
                
                
              </div>
              
            </div>
            
            <div className="detalles">
              <div className="collapse col-md-12" id={"c"+this.state.viaje[i].nodo }>
                    <div className="card card-body">
                      Tdetalles del bus






                      
                      <br></br>
                    </div>
                  </div>
              </div>
            </div>
            })}

          </div>
  

        
            </div>    
          </div>
  
  
  
  
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