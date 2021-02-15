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
import asientoNOdisponible from './imagenes/asientoNOdisponible.png';
import wc from './imagenes/wc.png';
import origen from './imagenes/origen.png';
import destino from './imagenes/destino.png';
import fecha from './imagenes/fecha.png';





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
      pre_compra:[],
      ip:'',
      ruta:'',
      nodo_precompra:'',
      puesto:'',
      usuarios:'',
      totalPuestos:'0',
      valorPuesto:'',
      contador:0,


      bandera: '0',
      modalInsertar: false,
      modalEditar: false,

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
        nombreTitular: '',
        apellidoTitular: '',
        tipoDocumento: '',
        numeroDocumento: '',
        fechaNacimiento: ''
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



    setIp =async (ip_sincomas) =>{


     await this.setState({ip: ip_sincomas });

    }


    setRuta =async (rutaResult) =>{

      await this.setState({ ruta:rutaResult});
      
    }

    setValorPuesto =async (rutaResult) =>{

      await this.setState({ valorPuesto:rutaResult});
      
    }

    cargarPuestos = async (valorPuesto,puesto)=>{

     



      var totalPuestos = 0 
      var origen = document.getElementById("origen").value
      var destino = document.getElementById("destino").value
      var ip = await publicIp.v4()

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
    
              break;


      }



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



      
            } else {
      
              this.setState({ puesto: [] });
      
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

        
              } else {
        
                this.setState({ puesto: [] });
        
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

        
              } else {
        
                this.setState({ puesto: [] });
        
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
        
              } else {
        
                this.setState({ puesto: [] });
        
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
        
              } else {
        
                this.setState({ puesto: [] });
        
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
          
                } else {
          
                  this.setState({ puesto: [] });
          
                }
              });
    
              break;


      }

      

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



      
            } else {
      
              this.setState({ puesto: [] });
      
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

        
              } else {
        
                this.setState({ puesto: [] });
        
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

        
              } else {
        
                this.setState({ puesto: [] });
        
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
        
              } else {
        
                this.setState({ puesto: [] });
        
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
        
  
                console.log(totalPuestos);
                this.setState({ totalPuestos: totalPuestos });
        
              } else {
        
                this.setState({ puesto: [] });
        
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
          
    
                  console.log(totalPuestos);
                  this.setState({ totalPuestos: totalPuestos });
          
                } else {
          
                  this.setState({ puesto: [] });
          
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
      console.log(this.state.form);
  
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

           


      var origen = document.getElementById("origen").value;
      var destino  = document.getElementById("destino").value;
      var fecha = document.getElementById("fecha").value; 






     if(origen!="Seleccione su origen"){

        if(destino != "Seleccione su destino"){
          


        if(fecha){

            

          
          let div = document.querySelector('#contenedor');
          div.style.visibility = 'visible';

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


    
      let div = document.querySelector('#contenedor');
      div.style.visibility = 'hidden';
  
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
                  <option value="Seleccione su origen" disabled  selected>Seleccione su origen</option>
                  {Object.keys(this.state.origen).map(i => {
       
                      return<option value={this.state.origen[i].origen}>{this.state.origen[i].origen}</option>

                  })}
                </select>
              </div>

              <div className="col-md-3 col-sm-6">
                <label for="destino" className="form-label text-muted">Origen</label> 
                <select id="destino" className="form-select" aria-label="Default select example">
                  <option value="Seleccione su destino" disabled selected >Seleccione su destino</option>
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


                
            <div id="contenedor"   className="container resultados">

              <div className="row titulos">
                <ul class="list-group list-group-horizontal p-0">
                  <li class="list-group-item col-md-2 col-sm-2 text-center"><a href="#">Terminal</a></li>
                  <li class="list-group-item col-md-2 col-sm-2 text-center">Hora Salida</li>
                  <li class="list-group-item col-md-2 col-sm-2 text-center">Cantidad</li>
                  <li class="list-group-item col-md-2 col-sm-2 text-center">Precio</li>
                  <li class="list-group-item col-md-2 col-sm-2 text-center ">Opciones</li>
                  <li class="list-group-item col-md-2 col-sm-2 text-center ">Opciones</li>
                </ul>           
       
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

              	{
                
                
                  "$"+ this.state.viaje[i].valor 

                
                
                }

                {<br></br>}

                <p>
                  <button className="btn btn-primary" type="button" data-bs-toggle="collapse" 
                  data-bs-target={"#c"+this.state.viaje[i].nodo } aria-expanded="false" aria-controls="collapseExample"  onClick={() => this.cargarPuestos(this.state.viaje[i].valor)}  >
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


                        <button id={"p1"+this.state.viaje[i].nodo} className="btn btn-danger" onClick={() => this.puesto("p1"+this.state.viaje[i].nodo)}>Puesto</button>

                        <button id={"p2"+this.state.viaje[i].nodo} className="btn btn-danger" onClick={() => this.puesto("p2"+this.state.viaje[i].nodo)}>Puesto</button>

                        
                        <button id={"p3"+this.state.viaje[i].nodo} className="btn btn-danger" onClick={() => this.puesto("p3"+this.state.viaje[i].nodo)}>Puesto</button>





                        <div id="contenedor"   className="container resultados">

                          <div className="row titulos">
                            <ul class="list-group list-group-horizontal p-0">
                              <li class="list-group-item col-md-2 col-sm-2 text-center">Pesto</li>
                              
                            </ul>           

                          </div>


                              {Object.keys(this.state.puesto).map(i => { 
                                
                              
                                 return <div className="listahorario mx-1">
                                 <div className="row my-2 p-2">

            

                                   <div className="col-md-2 col-sm-2 text-center border-end ">
                                     {this.state.puesto[i].puesto}
                                   </div>


                                   <div className="col-md-2 col-sm-2">

                                     <button className="btn btn-danger" onClick={()=>this.seleccionarPuesto(this.state.puesto[i], i, 'Eliminar')}>Eliminar</button>

                                   </div>  


                                   </div>


                                   </div>

                        

                                  })}


                                    <div className="col-md-2 col-sm-2">
                                     <input type="text" className="btn btn-danger" value={"$"+this.state.totalPuestos} />
                                   </div>  

                                   <div className="col-md-2 col-sm-2">
                                     <input type="text" className="btn btn-danger" value="Continuar"  onClick={()=>this.setState({modalInsertar: true})}/>
                                   </div> 
                        </div>
                          


                      
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
  
              <ModalHeader>Titular Reserva</ModalHeader>
              <ModalBody>
  
                <div className="form-group">
                  <label>Nomre Titular: </label>
                  <br />
                  <input id="nombreTitular"  type="text" className="form-control" name="nombreTitular" onChange={this.handleChange} />
                  <br />
                  <label>Apellido Titular: </label>
                  <br />
                  <input id="apellidoTitular" type="text" className="form-control" name="apellidoTitular" onChange={this.handleChange} />
                  <br />
                  <label>Tipo Documento: </label>
                  <br />

                  <select id="tipoDocumento" className="form-control" name="tipoDocumento" onChange={this.handleChange}  >
                      <option selected disabled value="Seleccione Documento">Seleccione Documento</option>
                      <option value="C.c">C.c</option>
                      <option value="T.i">T.i</option>
                      <option value="PEP">PEP</option>
           
                  </select>


                  <br />
                  <label>Numero Docuemnto </label>
                  <br />
                  <input id="numeroDocumento" type="text" className="form-control" name="numeroDocumento" onChange={this.handleChange} />

                  <br />
                  <label>Fecha Nacimiento </label>
                  <br />
                  <input id="fechaNacimiento" type="date" className="form-control" name="fechaNacimiento" onChange={this.handleChange} />

                  <div id="pasarela"></div>


                </div>



      
              </ModalBody>
              <ModalFooter>
  
                <button className="btn btn-primary" onClick={() => this.peticionCompra()}>Reservar</button>{"   "}
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