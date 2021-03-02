import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth';
import firebase from './firebaseConfig';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ContactsOutlined, ContactSupportOutlined } from '@material-ui/icons';
import moment from "moment";
import continental from './imagenes/conti.png';
import bolivariano from './imagenes/bol.jpeg';

import  publicIp from 'public-ip';



import './Formcotizador.css'
import bus from './imagenes/BUS2.png';
import asientodisponible from './imagenes/asientodisponible.png';
import asientoselected from './imagenes/asientoNOdisponible.png';

import wc from './imagenes/wc.png';
import origen from './imagenes/origen.png';
import destino from './imagenes/destino.png';
import calendario from './imagenes/fecha.png';
import ScriptTag from 'react-script-tag';

import Iframe from 'react-iframe'
import jQuery from 'jquery'
import progres from './imagenes/progres.gif';





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
      puestos:[],
      reservas:[],
      pre_compra:[],
      ip:'',
      ruta:'',
      horaSalida:'',
      fechaReserva:'',
      nodo_precompra:'',
      destino:'',
      puesto:'',
      usuarios:'',
      ipkey:'',
      fila:'0',
      idboton:'0',
      totalPuestos:'0',
      totalPuestosComa:'0',
      valorPuesto:'',
      contador:0,

      bandera: '0',
      divPasarela: false,
      modalPasarela: false,
      modalInsertar: false,
      modalEditar: false,
      estadoCheck: false,
      estadoPago: false,

      compra:{
         id_compra:'',
         fecha:'',
         nombre:'',
         apellido:'',
         metodo_pago:'',
         total:'',
         estado:'' 
      },


      prereserva: {
        puesto: '',
      
      },

      form: {
        nombres: '',
        apellidos: '',
        tipoDocumento: '',
        numeroDocumento: '',
        numeroContacto: '',
        correo: ''
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

    peticionViaje = (origen,destino,fecha) => {


      switch(origen+" "+destino){


        case "Ipiales Bogotá":

         


          firebase.database().ref().child("viaje").child("Ipi-Bog").on("value", (canal) => {
  
            if (canal.val() !== null) {

              this.setState({ ...this.state.viaje, viaje: canal.val() });
              this.setState({ destino:"Ipi-Bog" });

      
            } else {

              this.setState({ viaje: [] });
      
            }
          });



          break;


          case "Ipiales Cali":


            firebase.database().ref().child("viaje").child("Ipi-Cal").on("value", (canal) => {
    
              if (canal.val() !== null) {
      
                this.setState({ ...this.state.viaje, viaje: canal.val() });
        
                this.setState({ destino:"Ipi-Cal" });
              } else {
        
                this.setState({ viaje: [] });
        
              }
            });
  
            break;



            
          case "Ipiales Medellin Sur":


            firebase.database().ref().child("viaje").child("Ipi-Med").on("value", (canal) => {
    
              if (canal.val() !== null) {
      
                this.setState({ ...this.state.viaje, viaje: canal.val() });
                this.setState({ destino:"Ipi-Med" });
              } else {
        
                this.setState({ viaje: [] });
        
              }
            });
  
            break;


          case "Bogotá Ipiales":

        
          firebase.database().ref().child("viaje").child("Bog-Ipi").on("value", (canal) => {
  
            if (canal.val() !== null) {
    
              this.setState({ ...this.state.viaje, viaje: canal.val() });
              this.setState({ destino:"Bog-Ipi" });
            } else {
      
              this.setState({ viaje: [] });
      
            }
          });

          break;





          case "Cali Ipiales":

        
            firebase.database().ref().child("viaje").child("Cal-Ipi").on("value", (canal) => {
    
              if (canal.val() !== null) {
      
                this.setState({ ...this.state.viaje, viaje: canal.val() });
                this.setState({ destino:"Cal-Ipi" });
        
              } else {
        
                this.setState({ viaje: [] });
        
              }
            });
  
            break;

            case "Medellin Sur Ipiales":

        
              firebase.database().ref().child("viaje").child("Med-Ipi").on("value", (canal) => {
      
                if (canal.val() !== null) {
        
                  this.setState({ ...this.state.viaje, viaje: canal.val() });
                  
                  this.setState({ destino:"Med-Ipi" });

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



    setIp =async (ip_sincomas) =>{


     await this.setState({ip: ip_sincomas });

    }


    setRuta =async (rutaResult) =>{

      await this.setState({ ruta:rutaResult});
      
    }

    setValorPuesto =async (rutaResult) =>{

      await this.setState({ valorPuesto:rutaResult});
      
    }


    cargarReservas = async (fecha,horario)=>{

     

    }


    cargarPuestos = async (valorPuesto,horario,panelBus,panelImagen,fila,idboton)=>{

     

      document.getElementById(panelImagen).style.display = "block"
      document.getElementById(panelBus).style.display = "none";
      
  

      this.setState({ fila: fila});
      this.setState({ horaSalida: horario});
      this.setState({ fechaReserva: document.getElementById("fecha").value});


      var totalPuestos = 0 
      var origen = document.getElementById("origen").value
      var destino = document.getElementById("destino").value
      var ip = await publicIp.v4()
      var fecha = document.getElementById("fecha").value;
      var cadenas = ip.split(".");
      var ip_sincomas = "";

      for(var i = 0; i < cadenas.length;i++){
        ip_sincomas = ip_sincomas+cadenas[i];
      }


     this.setValorPuesto(valorPuesto)
         
     this.setIp(ip_sincomas)



        
      switch(origen+" "+destino){

        case "Ipiales Bogotá":


      
          this.setState({ totalPuestos:0 });
          this.setRuta("Ipi-Bog")

          {Object.keys(this.state.puesto).map(i => {

            document.getElementById(this.state.puesto[i].puesto).disabled=false;   
        
          })}
  
      

          firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Ipi-Bog").remove(
            error => {
              if (error) console.log(error)
          });



       
          firebase.database().ref().child("reservas").child(fecha).child(horario).child("Ipi-Bog").child("puestos").on("value", (canal) => {
  
            if (canal.val() !== null) {

     
  
              this.setState({ ...this.state.reservas, reservas: canal.val() });
              
              {Object.keys(this.state.reservas).map(i => {
    

               
                document.getElementById(this.state.reservas[i].puesto).disabled=true;  
               document.getElementById(this.state.reservas[i].puesto).src=asientoselected

            
            })}
           

            } else {
    

             


              {Object.keys(this.state.reservas).map(i => {
    
                document.getElementById(this.state.reservas[i].puesto).disabled=false;  
       
              })}

            this.setState({ reservas: [] });

            }
          });

         

          break;


          case "Ipiales Cali":

            this.setState({ totalPuestos:0 });

            this.setRuta("Ipi-Cal")

            {Object.keys(this.state.puesto).map(i => {

              document.getElementById(this.state.puesto[i].puesto).disabled=false;   
          
            })}
    

            firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Ipi-Cal").remove(
              error => {
                if (error) console.log(error)
              });



              firebase.database().ref().child("reservas").child(fecha).child(horario).child("Ipi-Cal").child("puestos").on("value", (canal) => {
  
                if (canal.val() !== null) {
    
         
      
                  this.setState({ ...this.state.reservas, reservas: canal.val() });
                  
                  {Object.keys(this.state.reservas).map(i => {
        
                    document.getElementById(this.state.reservas[i].puesto).disabled=true; 
                      
                
                })}
               
    
                } else {
    
                  {Object.keys(this.state.reservas).map(i => {
    
                    document.getElementById(this.state.reservas[i].puesto).disabled=false;  
           
                  })}
        
                  this.setState({ reservas: [] });
    
        
                }
              });  


  
            break;

            
          case "Ipiales Medellin Sur":

          
            this.setState({ totalPuestos:0 });

            this.setRuta("Ipi-Med")

            {Object.keys(this.state.puesto).map(i => {

              document.getElementById(this.state.puesto[i].puesto).disabled=false;   
          
            })}
    

            firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Ipi-Med").remove(
              error => {
                if (error) console.log(error)
              });
            



              
              firebase.database().ref().child("reservas").child(fecha).child(horario).child("Ipi-Med").child("puestos").on("value", (canal) => {
  
                if (canal.val() !== null) {
    
         
      
                  this.setState({ ...this.state.reservas, reservas: canal.val() });
                  
                  {Object.keys(this.state.reservas).map(i => {
        
                    document.getElementById(this.state.reservas[i].puesto).disabled=true;   
                
                })}
               
    
                } else {


                  {Object.keys(this.state.reservas).map(i => {
    
                    document.getElementById(this.state.reservas[i].puesto).disabled=false;  
           
                  })}
    
                  this.setState({ reservas: [] });
                  
                  
        
                }
              }); 


            break;


          case "Bogotá Ipiales":

            this.setState({ totalPuestos:0 });
          
            this.setRuta("Bog-Ipi")

            {Object.keys(this.state.puesto).map(i => {

              document.getElementById(this.state.puesto[i].puesto).disabled=false;   
          
            })}
    

            firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Bog-Ipi").remove(
              error => {
                if (error) console.log(error)
            });


            
            firebase.database().ref().child("reservas").child(fecha).child(horario).child("Bog-Ipi").child("puestos").on("value", (canal) => {
  
              if (canal.val() !== null) {
  
       
    
                this.setState({ ...this.state.reservas, reservas: canal.val() });
                
                {Object.keys(this.state.reservas).map(i => {
      
                  document.getElementById(this.state.reservas[i].puesto).disabled=true;   
              
              })}
             
  
              } else {

                {Object.keys(this.state.reservas).map(i => {
    
                  document.getElementById(this.state.reservas[i].puesto).disabled=false;  
         
                })}
  
      
                this.setState({ reservas: [] });
  
      
              }
            }); 



          break;





          case "Cali Ipiales":

            this.setState({ totalPuestos:0 });

              
            this.setRuta("Cal-Ipi")

            {Object.keys(this.state.puesto).map(i => {

              document.getElementById(this.state.puesto[i].puesto).disabled=false;   
          
            })}
    
            
            firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Cal-Ipi").remove(
              error => {
                if (error) console.log(error)
              });



              firebase.database().ref().child("reservas").child(fecha).child(horario).child("Cal-Ipi").child("puestos").on("value", (canal) => {
  
                if (canal.val() !== null) {
    
         
      
                  this.setState({ ...this.state.reservas, reservas: canal.val() });
                  
                  {Object.keys(this.state.reservas).map(i => {
        
                    document.getElementById(this.state.reservas[i].puesto).disabled=true;   
                
                })}
               
    
                } else {
    

                  {Object.keys(this.state.reservas).map(i => {
    
                    document.getElementById(this.state.reservas[i].puesto).disabled=false;  
           
                  })}
        
                  this.setState({ reservas: [] });
    
        
                }
              }); 
            break;

            case "Medellin Sur Ipiales":

              this.setState({ totalPuestos:0 });

              this.setRuta("Med-Ipi")

              {Object.keys(this.state.puesto).map(i => {

                document.getElementById(this.state.puesto[i].puesto).disabled=false;   
            
              })}
      

              firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Med-Ipi").remove(
                error => {
                  if (error) console.log(error)
                });



                firebase.database().ref().child("reservas").child(fecha).child(horario).child("Med-Ipi").child("puestos").on("value", (canal) => {
  
                  if (canal.val() !== null) {
      
           
        
                    this.setState({ ...this.state.reservas, reservas: canal.val() });
                    
                    {Object.keys(this.state.reservas).map(i => {
          
                      document.getElementById(this.state.reservas[i].puesto).disabled=true;   
                  
                  })}
                 
      
                  } else {
      
          
                    {Object.keys(this.state.reservas).map(i => {
    
                      document.getElementById(this.state.reservas[i].puesto).disabled=false;  
             
                    })}

                    this.setState({ reservas: [] });
      
          
                  }
                }); 
    
              break;


      }



     //CAMBIO DE TEXTO DEL BOTON SILLAS
    


      if(this.state.idboton != idboton){


      }else{
      
      
      }

/*
      this.setState({ idboton:idboton});

      var uno = document.getElementById(idboton);
      if (uno.innerText == 'Seleccionar Silla'){
        uno.innerText = 'Ocultar';
        uno.style.backgroundColor = 'rgb(248, 105, 14)';
      }
      else {
        uno.innerText = 'Seleccionar Silla';
        uno.style.backgroundColor = 'rgb(192, 10, 80)'; 
      }
*/
     




      setTimeout(function() {

        document.getElementById(panelImagen).style.display = "none"

        document.getElementById(panelBus).style.display = "block";
  
      },1500);
      

    }


    puesto = async (val) => {

      
  
      document.getElementById(val).disabled=true;

      

      var valPuesto = this.state.valorPuesto
      var totalPuestos = 0 

      var origen = document.getElementById("origen").value
      var destino = document.getElementById("destino").value


      var ip = await publicIp.v4()
      var cadenas = ip.split(".");
      var ip_sincomas = "";
      for(var i = 0; i < cadenas.length;i++){
        ip_sincomas = ip_sincomas+cadenas[i];
      }


      this.setState({ipkey: ip_sincomas })


    
      switch(origen+" "+destino){


     

        case "Ipiales Bogotá":

          this.setState({ totalPuestos:0 });


          firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Ipi-Bog").push({id_pre_compra:"Ipi-Bog",puesto:val,val_puesto:valPuesto},
          error => {
            if (error) console.log(error)

          });


          firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Ipi-Bog").on("value", (canal) => {
  
            if (canal.val() !== null) {
      
    
              this.setState({ ...this.state.puesto, puesto: canal.val() });


              {Object.keys(this.state.puesto).map(i => {
                totalPuestos = this.state.puesto[i].val_puesto + totalPuestos
            
              })}
      


              this.setState({ totalPuestos: totalPuestos });

              this.setState({ totalPuestosComa: new Intl.NumberFormat().format(totalPuestos) });


      
            } else {
      
              this.setState({ puesto: [] });
              this.setState({ totalPuestosComa: "0" });
      
            }
          });
        

          break;


          case "Ipiales Cali":

            this.setState({ totalPuestos:0 });

            firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Ipi-Cal").push({id_pre_compra:"Ipi-Cal",puesto:val,val_puesto:valPuesto},
            error => {
              if (error) console.log(error)
            });


            firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Ipi-Cal").on("value", (canal) => {
  
              if (canal.val() !== null) {
        
      
                this.setState({ ...this.state.puesto, puesto: canal.val() });



                {Object.keys(this.state.puesto).map(i => {
                  totalPuestos = this.state.puesto[i].val_puesto + totalPuestos
              
                })}
        
 

                this.setState({ totalPuestos: totalPuestos });

        
                this.setState({ totalPuestosComa: new Intl.NumberFormat().format(totalPuestos) });


      
            } else {
      
              this.setState({ puesto: [] });
              this.setState({ totalPuestosComa: "0" });
      
            }
            });

           
            break;

            
          case "Ipiales Medellin Sur":

            this.setState({ totalPuestos:0 });
              
            firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Ipi-Med").push({id_pre_compra:"Ipi-Med",puesto:val,val_puesto:valPuesto},
            error => {
              if (error) console.log(error)
            });
           
            
            firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Ipi-Med").on("value", (canal) => {
  
              if (canal.val() !== null) {
        
      
                this.setState({ ...this.state.puesto, puesto: canal.val() });

                {Object.keys(this.state.puesto).map(i => {
                  totalPuestos = this.state.puesto[i].val_puesto + totalPuestos
              
                })}
        
  

                this.setState({ totalPuestos: totalPuestos });

                this.setState({ totalPuestosComa: new Intl.NumberFormat().format(totalPuestos) });


      
              } else {
        
                this.setState({ puesto: [] });
                this.setState({ totalPuestosComa: "0" });
        
              }
            });
  
            break;


          case "Bogotá Ipiales":

            this.setState({ totalPuestos:0 });

            firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Bog-Ipi").push({id_pre_compra:"Bog-Ipi",puesto:val,val_puesto:valPuesto},
            error => {
              if (error) console.log(error)
            });
          



            firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Bog-Ipi").on("value", (canal) => {
  
              if (canal.val() !== null) {
        
      
                this.setState({ ...this.state.puesto, puesto: canal.val() });

                {Object.keys(this.state.puesto).map(i => {
                  totalPuestos = this.state.puesto[i].val_puesto + totalPuestos
              
                })}
        
  
 
                this.setState({ totalPuestos: totalPuestos });
        
                this.setState({ totalPuestosComa: new Intl.NumberFormat().format(totalPuestos) });


      
              } else {
        
                this.setState({ puesto: [] });
                this.setState({ totalPuestosComa: "0" });
        
              }
            });


          break;





          case "Cali Ipiales":
            this.setState({ totalPuestos:0 });

            firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Cal-Ipi").push({id_pre_compra:"Cal-Ipi",puesto:val,val_puesto:valPuesto},
            error => {
              if (error) console.log(error)
            });
            
            
            firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Cal-Ipi").on("value", (canal) => {
  
              if (canal.val() !== null) {
        
      
                this.setState({ ...this.state.puesto, puesto: canal.val() });

                {Object.keys(this.state.puesto).map(i => {
                  totalPuestos = this.state.puesto[i].val_puesto + totalPuestos
              
                })}
        

                this.setState({ totalPuestos: totalPuestos });
        
                this.setState({ totalPuestosComa: new Intl.NumberFormat().format(totalPuestos) });


      
            } else {
      
              this.setState({ puesto: [] });
              this.setState({ totalPuestosComa: "0" });
      
            }
            });


            break;

            case "Medellin Sur Ipiales":

              this.setState({ totalPuestos:0 });

              firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Med-Ipi").push({id_pre_compra:"Med-Ipi",puesto:val,val_puesto:valPuesto},
              error => {
                if (error) console.log(error)
              });
             

              firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Med-Ipi").on("value", (canal) => {
  
                if (canal.val() !== null) {
          
        
                  this.setState({ ...this.state.puesto, puesto: canal.val() });

                  {Object.keys(this.state.puesto).map(i => {
                    totalPuestos = this.state.puesto[i].val_puesto + totalPuestos
                
                  })}
          
    

                  this.setState({ totalPuestos: totalPuestos });
          
                  this.setState({ totalPuestosComa: new Intl.NumberFormat().format(totalPuestos) });


      
                } else {
          
                  this.setState({ puesto: [] });
                  this.setState({ totalPuestosComa: "0" });
          
                }
              });
    
              break;


      }

      

    };

  
    peticionPost = () => {


  
        
  

    }
  
    peticionPut = () => {
  
      firebase.database().ref().child(`canales/${this.state.id}`).set(
        this.state.form,
        error => {
          if (error) console.log(error)
        });
      this.setState({ modalEditar: false });
  
    }
  
    peticionDelete  =async  () => {
  
    
     

        
      document.getElementById(this.state.prereserva.puesto).disabled=false;


      var valPuesto = this.state.valorPuesto
      var totalPuestos = 0 

      var origen = document.getElementById("origen").value
      var destino = document.getElementById("destino").value
      var ip = await publicIp.v4()

      var cadenas = ip.split(".");
      var ip_sincomas = "";
      for(var i = 0; i < cadenas.length;i++){
        ip_sincomas = ip_sincomas+cadenas[i];
      }


     // if (window.confirm(`Estás seguro que deseas eliminar el canal ${this.state.prereserva && this.state.prereserva.puesto}?`)) {
        firebase.database().ref().child(`pre_compra/${this.state.ip}/${this.state.ruta}/${this.state.id}`).remove(
          error => {
            if (error) console.log(error)
          });
    //  }



    
      switch(origen+" "+destino){


     

        case "Ipiales Bogotá":

          this.setState({ totalPuestos:0 });

      

          firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Ipi-Bog").on("value", (canal) => {
  
            if (canal.val() !== null) {
      
    
              this.setState({ ...this.state.puesto, puesto: canal.val() });


              {Object.keys(this.state.puesto).map(i => {
                totalPuestos = this.state.puesto[i].val_puesto + totalPuestos
            
              })}
      


              this.setState({ totalPuestos: totalPuestos });
              this.setState({ totalPuestosComa: new Intl.NumberFormat().format(totalPuestos)});


      
            } else {
      
              this.setState({ puesto: [] });
              this.setState({ totalPuestosComa: "0" });
      
            }
          });
        

          break;


          case "Ipiales Cali":

            this.setState({ totalPuestos:0 });


            firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Ipi-Cal").on("value", (canal) => {
  
              if (canal.val() !== null) {
        
      
                this.setState({ ...this.state.puesto, puesto: canal.val() });



                {Object.keys(this.state.puesto).map(i => {
                  totalPuestos = this.state.puesto[i].val_puesto + totalPuestos
              
                })}
        
 

                this.setState({ totalPuestos: totalPuestos });

        
                this.setState({ totalPuestosComa: new Intl.NumberFormat().format(totalPuestos)});


      
              } else {
        
                this.setState({ puesto: [] });
                this.setState({ totalPuestosComa: "0" });
        
              }
            });

           
            break;

            
          case "Ipiales Medellin Sur":

            this.setState({ totalPuestos:0 });
                       
            
            firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Ipi-Med").on("value", (canal) => {
  
              if (canal.val() !== null) {
        
      
                this.setState({ ...this.state.puesto, puesto: canal.val() });

                {Object.keys(this.state.puesto).map(i => {
                  totalPuestos = this.state.puesto[i].val_puesto + totalPuestos
              
                })}
        
  

                this.setState({ totalPuestos: totalPuestos });

        
                this.setState({ totalPuestosComa: new Intl.NumberFormat().format(totalPuestos)});


      
              } else {
        
                this.setState({ puesto: [] });
                this.setState({ totalPuestosComa: "0" });
        
              }
            });
  
            break;


          case "Bogotá Ipiales":

            this.setState({ totalPuestos:0 });


            firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Bog-Ipi").on("value", (canal) => {
  
              if (canal.val() !== null) {
        
      
                this.setState({ ...this.state.puesto, puesto: canal.val() });

                {Object.keys(this.state.puesto).map(i => {
                  totalPuestos = this.state.puesto[i].val_puesto + totalPuestos
              
                })}
        
  

                this.setState({ totalPuestos: totalPuestos });
        
                this.setState({ totalPuestosComa: new Intl.NumberFormat().format(totalPuestos)});


      
              } else {
        
                this.setState({ puesto: [] });
                this.setState({ totalPuestosComa: "0" });
        
              }
            });


          break;





          case "Cali Ipiales":
            this.setState({ totalPuestos:0 });
            
            
            firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Cal-Ipi").on("value", (canal) => {
  
              if (canal.val() !== null) {
        
      
                this.setState({ ...this.state.puesto, puesto: canal.val() });

                {Object.keys(this.state.puesto).map(i => {
                  totalPuestos = this.state.puesto[i].val_puesto + totalPuestos
              
                })}
        
  

                this.setState({ totalPuestos: totalPuestos });
        
                this.setState({ totalPuestosComa: new Intl.NumberFormat().format(totalPuestos)});


      
            } else {
      
              this.setState({ puesto: [] });
              this.setState({ totalPuestosComa: "0" });
      
            }
            });


            break;

            case "Medellin Sur Ipiales":

              this.setState({ totalPuestos:0 });


              firebase.database().ref().child("pre_compra").child(ip_sincomas).child("Med-Ipi").on("value", (canal) => {
  
                if (canal.val() !== null) {
          
        
                  this.setState({ ...this.state.puesto, puesto: canal.val() });

                  {Object.keys(this.state.puesto).map(i => {
                    totalPuestos = this.state.puesto[i].val_puesto + totalPuestos
                
                  })}
          
    
       
                  this.setState({ totalPuestos: totalPuestos });
          
                  this.setState({ totalPuestosComa: new Intl.NumberFormat().format(totalPuestos)});


      
                } else {
          
                  this.setState({ puesto: [] });
                  this.setState({ totalPuestosComa: "0" });
          
                }
              });
    
              break;

            }

  
    };
  
    handleChange = e => {
  
      this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value
        }
      })
    //  console.log(this.state.form);
  
    }


    check  =async  () => {

      var nombre = document.getElementById("nombres").value
      var apellido = document.getElementById("apellidos").value
      var documento = document.getElementById("tipoDocumento").value
      var numerodocumento = document.getElementById("numeroDocumento").value
      var numerocontacto = document.getElementById("numeroContacto").value
      var correo = document.getElementById("correo").value




      if(nombre !=""  && apellido !="" && documento !="Seleccione Documento" && numerodocumento!="" && numerocontacto!="" &&correo!=""){

        this.setState({divPasarela: true})

 
        /*
        if (target.checked){

          target.removeAttribute('checked');
          target.parentNode.style.textDecoration = "";
         
  
       } else {
  
          target.setAttribute('checked', true);
          target.parentNode.style.textDecoration = "line-through";
  
          //porgramcion para activar formulario de pago 
          
          this.setState({divPasarela: true });


       }*/



      }else{

       

        this.setState({divPasarela: false})

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debe llenar toda la información',
      
        })
       
      }


    // pasarela
    }
  

    seleccionarCanal = async (canal, id, caso) => {
  
      await this.setState({ form: canal, id: id });
  
      (caso === "Editar") ? this.setState({ modalEditar: true }) :
        this.peticionDelete()
  
    }


    seleccionarPuesto = async (canal, id, caso) => {
 
  
      await this.setState({ prereserva: canal, id: id });


  
      (caso === "Editar") ? this.setState({ modalEditar: true }) :
        this.peticionDelete()

        
  
    }


    buscar = async () => {

      document.getElementById("containerMenu").style.display = "none";


    if(this.state.fila!=0){

      document.getElementById(this.state.fila).classList.remove("show");

    }
    if(this.state.idboton!=0){

      var uno = document.getElementById(this.state.idboton);
        uno.innerText = 'Seleccionar Silla';
        uno.style.backgroundColor = 'rgb(192, 10, 80)'; 
      
    }



      var origen = document.getElementById("origen").value;
      var destino  = document.getElementById("destino").value;
      var fecha = document.getElementById("fecha").value; 




     if(origen!="Seleccione su origen"){

        if(destino != "Seleccione su destino"){
          


        if(fecha){

            

          let div = document.querySelector('#contenedor');
          div.style.visibility = 'visible';
          

           

            this.setState({ ...this.state.fecha, fecha: fecha });

            this.peticionViaje(origen,destino,fecha);


            document.getElementById("progresMenu").style.display = "block"

            setTimeout(function() {

              document.getElementById("progresMenu").style.display = "none"
      
              document.getElementById("containerMenu").style.display = "block";
        
            },1500);
      

  

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


    continuar = async () => {


        firebase.database().ref().child("compra").child("Ipi_Bog").push(this.state.puesto,
        error => {
          if (error) console.log(error)
        });

    }


    peticionGetRutas = () => {



      let date = new Date()

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      
 

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


    }
  
  
    componentDidMount() {


      document.getElementById("progresMenu").style.display = "none"
      
      document.getElementById("containerMenu").style.display = "none";




      let div = document.querySelector('#contenedor');
      div.style.visibility = 'hidden';


      //Validacion de la fecha

      var fecha = new Date();
      var anio = fecha.getFullYear();
      var dia = fecha.getDate();
      if (dia < 10)//ahora le agregas un 0 para el formato date
      { var dia = "0"+dia;}
      else
      { var dia = dia.toString;}


      var _mes = fecha.getMonth();//viene con valores de 0 al 11
      _mes = _mes + 1;//ahora lo tienes de 1 al 12
      if (_mes < 10)//ahora le agregas un 0 para el formato date
      { var mes = "0" + _mes;}
      else
      { var mes = _mes.toString;}
      document.getElementById("fecha").min = anio+'-'+mes+'-'+dia;
  




      this.peticionGetRutas();
      this.peticionGetFlotas();
    
    }
  
    peticionCompra = () => {

      var nombre = document.getElementById("nombreTitular").value
      var apellido = document.getElementById("apellidoTitular").value
      var tipodocumento = document.getElementById("tipoDocumento").value
      var numerodocumento = document.getElementById("numeroDocumento").value
      var fechanacimiento = document.getElementById("fechaNacimiento").value




      if(nombre||apellido||numerodocumento||fechanacimiento){

        if(tipodocumento!="Seleccione Documento"){

            //pasareala de pagos 


    
          
          /*
        
            var html = '<form>'+
            '<script'+
              'src=https://checkout.epayco.co/checkout.js'+
              'class="epayco-button"'+
              'data-epayco-key="491d6a0b6e992cf924edd8d3d088aff1"'+
              'data-epayco-amount="50000"'+
              'data-epayco-name="Vestido Mujer Primavera"'+
              'data-epayco-description="Vestido Mujer Primavera"'+
              'data-epayco-currency="cop"'+
              'data-epayco-country="co"'+
              'data-epayco-test="true"'+
              'data-epayco-external="false"'+
              'data-epayco-response="https://ejemplo.com/respuesta.html"'+
              'data-epayco-confirmation="https://ejemplo.com/confirmacion">'+
          '</script>'+
          '</form>';*/


      /*    var handler = ePayco.checkout.configure({
  				key: '45b960805ced5c27ce34b1600b4b9f54',
  				test: true
  			})*/
 

        var epayco = require('epayco-sdk-node')({
          apiKey: '65caa5c799b54e82634b6daa4d39161d',
          privateKey: 'ea7949bd5ba30ad38441faefe3637c19',
          lang: 'ES',
          test: true
      })


   

        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debe seleccionar tipo documento',
        
          })
        }



      }else{

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debe complementar la información',
      
        })
      }

      
/*
  
      firebase.database().ref().child("compra").push(this.state.form,
        error => {
          if (error) console.log(error)
        });
      this.setState({ modalInsertar: false });
  */
    }
 


    pasarela = async () => {

      this.setState({modalInsertar: false })
      this.setState({modalPasarela: true })

    }

    continuar = async () => {

      this.setState({divPasarela: false})

       if(this.state.totalPuestosComa!=0){

       
          this.setState({modalInsertar: true })


       }else{

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debe escoger una puesto de viaje',
      
        })

       }
    }
 
  
    render() {


      var total = this.state.totalPuestos
      var descripcion =this.state.destino
      var ip =this.state.ipkey
      var fecha = this.state.fechaReserva
      var hora = this.state.horaSalida

      var url = "https://clickbus-50c68.web.app?total="+total +"&descripcion="+descripcion + "&ip="+ip+ "&fecha="+fecha + "&hora="+hora+ "&datospasajero="+ JSON.stringify(this.state.form)+"&puestos="+ JSON.stringify(this.state.puesto);

    //  let idUsuarios = this.props.cat
      return (

      
        
      <div className="container">
        <div className="row">

          <div className="card buscador border-1 p-3 col-md-12 col-sm-12 col-12">
            <div className="row">

              <div className="text-center col-md-3 col-sm-6 col-12">

                <img src={origen} alt=""/>
                <label for="origen" className="fw-bolder ms-2">ORIGEN</label>

                <select id="origen" name="origenes" className="form-select fondoamarillo mt-3" aria-label="Default select example" onClick={() => this.destino()} required>
                  <option className="fondo fw-bolder" value="Seleccione su origen" disabled  selected>Seleccione su origen</option>
                  {Object.keys(this.state.origen).map(i => {

                      return<option className="fondo fw-bolder" value={this.state.origen[i].origen}>{this.state.origen[i].origen}</option>

                  })}
                </select>

              </div>

              <div className="text-center col-md-3 col-sm-6 col-12">

                <img src={origen} alt=""/>
                <label for="destino" className="fw-bolder ms-2">DESTINO</label>

                <select id="destino" className="form-select fondoamarillo mt-3" aria-label="Default select example">
                  <option className="fondo fw-bolder" value="Seleccione su destino" disabled selected >Seleccione su destino</option>
                  {Object.keys("1").map(i => {

                    switch(this.state.destinoform){
                        case "Ipiales":
                          return (
                            <>
                                  <option className="fondo fw-bolder" value="Bogotá">Bogotá</option>
                                  <option className="fondo fw-bolder" value="Cali">Cali</option>
                                  <option className="fondo fw-bolder" value="Medellin Sur">Medellin Sur</option>
                            </>
                                  );
                          break;
                          case "Bogotá":
                            return (
                              <>
                                    <option className="fondo fw-bolder" value="Ipiales">Ipiales</option>
                              </>
                                    );
                            break;
                            case "Cali":
                              return (
                                <>
                                      <option className="fondo fw-bolder" value="Ipiales">Ipiales</option>
                                </>
                                      );
                              break;
                              case "Medellin Sur":
                                return (
                                  <>
                                        <option className="fondo fw-bolder" value="Ipiales">Ipiales</option>
                                  </>
                                        );
                                break;
                    }

                  })}
                </select>
              </div>

              <div className="text-center col-md-3 col-sm-12 col-12 ">

                <img src={calendario} alt=""/>
                <label for="fecha" className="fw-bolder ms-2">FECHA DE VIAJE</label>
                <input class="form-control fondoamarillo mt-3" type="date" id="fecha" min="2021-02-01"></input>

              </div>

              <div className="d-grid gap-2 text-center col-md-3 col-sm-12 col-12">
                <br></br>
                <button id="buscar" type="submit" className="btn fondovioleta" onClick={() => this.buscar()}>Buscar Bus</button>
              </div>

            </div>
          </div>
        </div>

        <br></br>


    

        <br></br>


        <div id="progresMenu" class="container text-center" >
          <img class="img-fluid  h-50 w-50" src={progres} alt="loading..." />
        </div>         


        <div id="containerMenu"> 

        <div className="row">
        <div className="col-md-12 col-sm-12">

          <div id="contenedor" className="card-body" >

          <div className="card">
            
              <div className="row titulos">
                
                <div className="col-md-2 col-sm-12  text-center ">
                <b>EMPRESAS</b><hr/>
                </div>
                <div className="col-md-2 col-sm-12 text-center">
                <b>HORA DE SALIDA</b><hr/>
                </div>
                <div className="col-md-2 col-sm-12 text-center">
                <b>TIPO DE BUS</b><hr/>
                </div>
                <div className="col-md-2 col-sm-12 text-center">
                <b>TERMINAL SLAIDA</b><hr/>
                </div>
                <div className="col-md-2 col-sm-12 text-center">
                <b>TERMINAL LLEGADA</b><hr/>
                </div>
                <div className="col-md-2 col-sm-12 text-center">
                <b>OPCIONES</b><hr/>
                </div>
                
              </div>
              </div>


              


                 <div className="my-2">
                  <div className="accordion" id="accordionExample">
                    {Object.keys(this.state.viaje).map(i => {

                    return<div className="accordion-item card sombra my-2">
                      <div className="accordion-header" id="headingOne">
                      <div className="row  my-2 p-2">
                        <div className="col-md-2 col-sm-12 text-center">
                          {
                            this.state.viaje[i].tipo_bus=="2G"? <img width="160px" src={bolivariano}></img>:
                            this.state.viaje[i].tipo_bus=="2G Gold"? <img width="160px" src={bolivariano}></img>:<img width="160px" src={continental}></img>
                          }
                        </div>

                        <div className="col-md-2 col-sm-12 text-center">
                         
                          {"Salida: "+this.state.viaje[i].horario}

                          {<br></br>}
                          {"Duracion: "+this.state.viaje[i].duracion}
                        </div>

                        <div className="col-md-2 col-sm-12 text-center ">

                          {
                            this.state.viaje[i].tipo_bus
                          }
                            <br/>
                          {
                          
                            this.state.viaje[i].tipo_bus=="2G"? <img width="160px" src={bolivariano}></img>:
                            this.state.viaje[i].tipo_bus=="2G Gold"? <img width="160px" src={bolivariano}></img>:<img width="160px" src={continental}></img>
                          }

                        </div>

                        <div className="col-md-2 col-sm-12 text-center">
                          {this.state.viaje[i].terminal_salida}
                        </div>

                        <div className="col-md-2 col-sm-12 text-center border-end">
                          {this.state.viaje[i].terminal_llegada}
                        </div>

                        <div className="col-md-2 col-sm-12 text-center">
                            <h3>{ "$"+  new Intl.NumberFormat().format( this.state.viaje[i].valor)}</h3>

                           



                             <button  id={"bo"+this.state.viaje[i].nodo}  className="btn consultar w-100" type="button" data-bs-toggle="collapse"
                            data-bs-target={"#c"+this.state.viaje[i].nodo} aria-expanded="false" aria-controls={"c"+this.state.viaje[i].nodo}   onClick={() => this.cargarPuestos(this.state.viaje[i].valor,this.state.viaje[i].horario,"b"+this.state.viaje[i].nodo,"i"+this.state.viaje[i].nodo,"c"+this.state.viaje[i].nodo,"bo"+this.state.viaje[i].nodo)}  >
                              Seleccionar Silla
                            </button>

                        </div>

                      </div>
                      </div>



                      


                      <div id={"c"+this.state.viaje[i].nodo} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                       
                        <div class="accordion-body" >

                          <div class="container text-center"   id={"i"+this.state.viaje[i].nodo}>
                            
                          < img class="img-fluid  h-50 w-50" src={progres} alt="loading..." />
                          
                          </div>  


                          <div id={"b"+this.state.viaje[i].nodo}>

                          <div className="row">

                        

                            <div className=" col-md-9 ">

                              <div className="bus">

                                <div className="asientos btn-group btn-group-sm mt-3" role="group">
                                  <button  id={"p1"+this.state.viaje[i].nodo}  onClick={() => this.puesto("p1"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p2"+this.state.viaje[i].nodo} onClick={() => this.puesto("p2"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p3"+this.state.viaje[i].nodo} onClick={() => this.puesto("p3"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p4"+this.state.viaje[i].nodo} onClick={() => this.puesto("p4"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p5"+this.state.viaje[i].nodo} onClick={() => this.puesto("p5"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p6"+this.state.viaje[i].nodo} onClick={() => this.puesto("p6"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p7"+this.state.viaje[i].nodo} onClick={() => this.puesto("p7"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p8"+this.state.viaje[i].nodo} onClick={() => this.puesto("p8"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p9"+this.state.viaje[i].nodo} onClick={() => this.puesto("p9"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p10"+this.state.viaje[i].nodo} onClick={() => this.puesto("p10"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button> 
                                  <img src={wc} alt=""/>                                                                 
                                </div>
                                <div className="asientos btn-group btn-group-sm mb-5" role="group">
                                  <button id={"p11"+this.state.viaje[i].nodo}  onClick={() => this.puesto("p11"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p12"+this.state.viaje[i].nodo} onClick={() => this.puesto("p12"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p13"+this.state.viaje[i].nodo} onClick={() => this.puesto("p13"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p14"+this.state.viaje[i].nodo} onClick={() => this.puesto("p14"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p15"+this.state.viaje[i].nodo} onClick={() => this.puesto("p15"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p16"+this.state.viaje[i].nodo} onClick={() => this.puesto("p16"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p17"+this.state.viaje[i].nodo} onClick={() => this.puesto("p17"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p18"+this.state.viaje[i].nodo} onClick={() => this.puesto("p18"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p19"+this.state.viaje[i].nodo} onClick={() => this.puesto("p19"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p20"+this.state.viaje[i].nodo} onClick={() => this.puesto("p20"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>

                                </div>
                                <div className="asientos btn-group btn-group-sm mt-5" role="group">
                                  <button  id={"p21"+this.state.viaje[i].nodo}  onClick={() => this.puesto("p21"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p22"+this.state.viaje[i].nodo} onClick={() => this.puesto("p22"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p23"+this.state.viaje[i].nodo} onClick={() => this.puesto("p23"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p24"+this.state.viaje[i].nodo} onClick={() => this.puesto("p24"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p25"+this.state.viaje[i].nodo} onClick={() => this.puesto("p25"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p26"+this.state.viaje[i].nodo} onClick={() => this.puesto("p26"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p27"+this.state.viaje[i].nodo} onClick={() => this.puesto("p27"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p28"+this.state.viaje[i].nodo} onClick={() => this.puesto("p28"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p29"+this.state.viaje[i].nodo} onClick={() => this.puesto("p29"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button>
                                  <button id={"p30"+this.state.viaje[i].nodo} onClick={() => this.puesto("p30"+this.state.viaje[i].nodo)} className="btn btn-group">
                                    <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                  </button> 

                                </div>
                                <div className="asientos btn-group btn-group-sm mb-3" role="group">
                                <button  id={"p31"+this.state.viaje[i].nodo}  onClick={() => this.puesto("p31"+this.state.viaje[i].nodo)} className="btn btn-group">
                                  <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                </button>
                                <button id={"p32"+this.state.viaje[i].nodo} onClick={() => this.puesto("p32"+this.state.viaje[i].nodo)} className="btn btn-group">
                                  <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                </button>
                                <button id={"p33"+this.state.viaje[i].nodo} onClick={() => this.puesto("p33"+this.state.viaje[i].nodo)} className="btn btn-group">
                                  <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                </button>
                                <button id={"p34"+this.state.viaje[i].nodo} onClick={() => this.puesto("p34"+this.state.viaje[i].nodo)} className="btn btn-group">
                                  <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                </button>
                                <button id={"p35"+this.state.viaje[i].nodo} onClick={() => this.puesto("p35"+this.state.viaje[i].nodo)} className="btn btn-group">
                                  <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                </button>
                                <button id={"p36"+this.state.viaje[i].nodo} onClick={() => this.puesto("p36"+this.state.viaje[i].nodo)} className="btn btn-group">
                                  <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                </button>
                                <button id={"p37"+this.state.viaje[i].nodo} onClick={() => this.puesto("p37"+this.state.viaje[i].nodo)} className="btn btn-group">
                                  <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                </button>
                                <button id={"p38"+this.state.viaje[i].nodo} onClick={() => this.puesto("p38"+this.state.viaje[i].nodo)} className="btn btn-group">
                                  <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                </button>
                                <button id={"p39"+this.state.viaje[i].nodo} onClick={() => this.puesto("p39"+this.state.viaje[i].nodo)} className="btn btn-group">
                                  <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                </button>
                                <button id={"p40"+this.state.viaje[i].nodo} onClick={() => this.puesto("p40"+this.state.viaje[i].nodo)} className="btn btn-group">
                                  <img src={asientodisponible} width="37px"  alt="Disponible"/>
                                </button> 

                              </div>
                                <br/>
                              </div>
                              <br/>
                            </div>


                            {/* </div> */}


                              <div className="col-md-3">
                              <table className="table tabla">
                                <thead className="table-dark">
                                  <tr>
                                    <th scope="col">N° puesto</th>
                                    <th scope="col">Opcion</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Object.keys(this.state.puesto).map(i => { 
                                  return <><tr>
                                    <th scope="row">{this.state.puesto[i].puesto}</th>

                                    <td>
                                      <button className="btn btn-danger" onClick={()=>this.seleccionarPuesto(this.state.puesto[i], i, 'Eliminar')}>Eliminar</button>
                                    </td>
                                  </tr>
                                  </>})}
                                </tbody>
                                  
                                  
                                <tfoot>
                                  <td>Total</td>
                                  <td><h3>{"$"+this.state.totalPuestosComa}</h3></td>
                                  
                                </tfoot>
                              </table>
                                  
                                <div>
                                  <button className="btn btn-danger" onClick={()=>this.continuar()}>Continuar</button>
                                </div>
                                  
                                  
                              </div>


                            </div>
                            
                          </div> 

                        </div>
                      </div>



                    </div>
                    })}
                  </div>
                </div>
                {/* // <div className="card listahorario my-2"> */}

            {/* </div>     */}
          </div>
        </div>
        </div>
           
        </div>         

       



        <Modal isOpen={this.state.modalInsertar}>

  
              <ModalHeader>Datos de Reserva</ModalHeader>
              <ModalBody>

             
                <div className="form-group">

                  <label>Nombres: </label>
                  <br />
                  <input id="nombres" type="text" className="form-control" name="nombres" onChange={this.handleChange} />
                  <br />
                  <label>Apellidos: </label>
                  <br />
                  <input id="apellidos" type="text" className="form-control" name="apellidos" onChange={this.handleChange} />
                  <br />
              
                  <select id="tipoDocumento" name="tipoDocumento" className="form-control"  onChange={this.handleChange}>

                      <option  value="Seleccione Documento" disabled  selected>Seleccione Documento</option>
                      <option  value="C.C">C.C</option>
                      <option  value="Pasaporte">Pasaporte</option>
                      <option  value="D.Extranjero">D.Extranjero</option>
                
                  </select>

                  <br />
                  <label>Número de Documento: </label>
                  <br />
                  <input min="0" id="numeroDocumento" type="number" className="form-control" name="numeroDocumento" onChange={this.handleChange} />

                  <br />
                  <label>Número de Contacto: </label>
                  <br />
                  <input min="0" id="numeroContacto" type="number" className="form-control" name="numeroContacto" onChange={this.handleChange} />

                  <br />
                  <label>Correo Electrónico: </label>
                  <br />
                  <input id="correo" type="text" className="form-control" name="correo" onChange={this.handleChange} />

                  <br />


                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"  onClick={()=>this.check()}></input>
                    <label class="form-check-label" for="flexCheckDefault">
                      acepta las politicas de Viaje 
                    </label>
                  </div>
                                    
                  <br />


                     

                </div>
  
              </ModalBody>
              <ModalFooter>
  
                <button className="btn btn-danger" onClick={() => this.setState({ modalInsertar: false })}>Cancelar</button>{"   "}
              

                {this.state.divPasarela ? (

                    <div className="redd">

                        <button className="btn btn-warning" onClick={() => this.pasarela()}>Pagar y reservar</button>


                    </div>

                    ) : (
                    
                    <div className="red2"> </div>
                    
                  )}
  
              </ModalFooter>
              
            </Modal>
  
  

            <Modal isOpen={this.state.modalEditar}>
              <ModalHeader></ModalHeader>
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
                <button className="btn btn-danger" onClick={() => this.pasarela()}>Cancelar</button>
              </ModalFooter>
            </Modal>





            <Modal isOpen={this.state.modalPasarela}>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <div className="form-group">
                      
                <Iframe url={url}
       
                   width="450px"
                   height="850px"
                   id="myId"
                   className="myClassname"
                   display="initial"
                   position="relative"

                   />


                </div>
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-danger" onClick={() => this.setState({ modalPasarela: false })}>Cancelar</button>
              </ModalFooter>
            </Modal>


          </div>
      
      );
    }
  }
  
  
  export default Formcotizador;