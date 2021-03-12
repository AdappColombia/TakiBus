import { ImageRounded } from '@material-ui/icons';
import React from 'react'; 

import Formcotizador from './Formcotizador';


import { Link } from 'react-router-dom';


//CARGO LOGOS
import nav from './imagenes/nav.png'
import vive from './imagenes/vive.png'
import bannertaki from './imagenes/bannertaki.png'
import  './cotizador.css'



import xlogo from './imagenes/img/logo.png'
    import xtaki from './imagenes/img/taki.png'
    import xviajar from './imagenes/img/viajar.png'
    import xreinventar from './imagenes/img/reinventar.png'
    import xcomplicacion from './imagenes/img/complicacion.png'
    import xfilas from './imagenes/img/filas.png'
    import xiconox from './imagenes/img/iconox.png'
    import xperdidas from './imagenes/img/perdidas.png'
    import xpreparate from './imagenes/img/preparate.png'
    import xviajarporcarretera from './imagenes/img/viajarporcarretera.png'
    import xiconoticket from './imagenes/img/iconoticket.png'
    import xdestinosnacionales from './imagenes/img/destinosnacionales.png'
    import xiconobus from './imagenes/img/iconobus.png'
    import xbusesnivel from './imagenes/img/busesnivel.png'
    import xiconotiempo from './imagenes/img/iconotiempo.png'
    import xahorratiempo from './imagenes/img/ahorratiempo.png'
    import xiconocelular from './imagenes/img/iconocelular.png'
    import xcomprasseguras from './imagenes/img/comprasseguras.png'
    import xiconogps from './imagenes/img/iconogps.png'
    import xdesdecualquier from './imagenes/img/desdecualquier.png'
    import xmujer from './imagenes/img/mujer.png'
    import xhombre from './imagenes/img/hombre.png'
    import xiconoflecha from './imagenes/img/iconoflecha.png'
    import xdescuentos from './imagenes/img/descuentos.png'
    import xcompraya from './imagenes/img/compraya.png'
    import xviawhatsapp from './imagenes/img/viawhatsapp.png'
    import xbushacia from './imagenes/img/bushacia.png'
    import xviajahacia from './imagenes/img/viajahacia.png'
    import xraipdo from './imagenes/img/raipdo.png'
    import xfacil from './imagenes/img/facil.png'
    import xseguro from './imagenes/img/seguro.png'
    import xprecioipiales from './imagenes/img/precioipiales.png'
    import xpreciocali from './imagenes/img/preciocali.png'
    import xpreciobogota from './imagenes/img/preciobogota.png'
    import xpreciomedellin from './imagenes/img/preciomedellin.png'
    import xmujerprecio from './imagenes/img/mujerprecio.png'   
    import xlogonombre from './imagenes/img/logonombre.png'
    import xviajaatrevete from './imagenes/img/viajaatrevete.png'
    import xespera from './imagenes/img/espera.png'
    import xhombreatrevete from './imagenes/img/hombreatrevete.png'    
    import xcontactanospie from './imagenes/img/contactanospie.png'
    import xiconopie from './imagenes/img/iconopie.png'
    import xiconowhatsapppie from './imagenes/img/iconowhatsapppie.png'
    import xnumeropie from './imagenes/img/numeropie.png'
    import xasesorpie from './imagenes/img/asesorpie.png'





export default function ElevateAppBar(props) {


  

  return (



 
    <React.Fragment>


<div class="container-fluid contenedorprincipal">
        <div class="principalpng">
            <div class="row m-0">
                <div class="col-12 col-sm-4 col-md-4 d-none d-md-block">
                    <div class="logoprincipalpng">               
                        <img src={xlogo} alt="" class="img-fluid" width="60%"></img>
                    </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 d-none d-sm-block d-md-none">
                    <div class="">               
                        <img src={xlogo} alt="" class="img-fluid" width="60%"></img>
                    </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 d-block d-sm-none p-3">               
                    <img src={xlogo} alt="" class="img-fluid mx-auto d-block" width="60%"></img>
                </div>


                <div class="col-12 col-sm-4 col-md-4 imagentaki d-none d-md-block ">
                    <div class="takipng">                  
                        <img src={xtaki} alt="" class="mx-auto d-block" width="50%"></img>
                    </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 d-none d-sm-block d-md-none my-auto ">
                    <div class="">                  
                        <img src={xtaki} alt="" class="mx-auto d-block my-auto" width="50%"></img>
                    </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 d-block d-sm-none ">
                    <div class="">                  
                        <img src={xtaki} alt="" class="mx-auto d-block" width="50%"></img>
                    </div>
                </div>


                <div class="col-12 col-sm-12 col-md-4">
                    <div class="viajarpng">
                        <img src={xviajar} alt="" class="mx-auto d-block" width="60%"></img>
                    </div>
                </div>
            </div>
        </div>

        <div class="row m-0 ">
            <div class="col-12 col-md-12 reinventarpng">
                <div class="">
                    <img src={xreinventar} alt="" class="mx-auto d-block" width="50%"></img>
                </div>
            </div>
        </div>

        <br></br>
        <Formcotizador/>



        <div class="row">
            <div class="col-12 col-sm-12 col-md-2 pt-4"></div>
        
            
            <div class="col-12 col-sm-12 col-md-2 p-4">
                <img src={xiconox} alt="" class="img-fluid mx-auto d-block"></img>
                <div class="p-3">
                    <br></br>
                    <img src={xcomplicacion} alt="" class=" img-fluid mx-auto d-block"></img>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-2 p-4">
                <img src={xiconox} alt="" class="img-fluid mx-auto d-block"></img>
                <div class="p-3 filaspng">
                    <br></br>
                    <img src={xfilas} class="img-fluid mx-auto d-block " alt=""></img>
                </div>              
            </div>
            <div class="col-12 col-sm-12 col-md-2 p-4">
                <img src={xiconox} alt="" class="img-fluid mx-auto d-block"></img>
                <div class="">  
                    <br></br>
                    <img src={xperdidas} alt="" class="img-fluid mx-auto d-block"></img>
                </div>
                
            </div>
            <div class="col-12 col-sm-12 col-md-4  pt-4">
                <img src={xpreparate} alt="" class=" img-fluid mx-auto d-block" width="50%"></img>
            </div>

        </div>




            
   {/* <nav className=" navbar-dark bg-dark"> 
          <img src={nav} alt="nav" className="img-fluid"/>
          
    </nav>

  <img width="100%" src={bannertaki} alt="presentacion vive" className="img-fluid"/>*/}

    




    
        <div class="row fondomujer">
            
            <div class="col-12 col-sm-12 col-md-12 pt-4 pb-5 ps-5 d-none d-sm-block">
                <img src={xviajarporcarretera} alt="" class="img-fluid  " width="30%" ></img>
            </div>
            <div class="col-12 col-sm-12 col-md-12 pt-4 pb-5 ps-5 d-block d-sm-none">
                <img src={xviajarporcarretera} alt="" class="img-fluid  " width="80%" ></img>
            </div>

            <div class="col-12 col-sm-6 col-md-2 ">
                <img src={xiconoticket} alt="" class="img-fluid mx-auto d-block"></img>
                <br></br>
                <img src={xdestinosnacionales} alt=""  class="img-fluid mx-auto d-block"></img>
            </div>
            <div class="col-12 col-sm-6 col-md-2 ">
                <img src={xiconobus} alt="" class="img-fluid mx-auto d-block" ></img>
                <br></br>
                <img src={xbusesnivel} alt=""  class="img-fluid mx-auto d-block"></img>
            </div>
            <div class="col-12 col-sm-6 col-md-2 ">
                <img src={xiconotiempo} alt="" class="img-fluid mx-auto d-block" ></img>
                <br></br>
                <img src={xahorratiempo} alt=""  class="img-fluid mx-auto d-block"></img>
            </div>
            <div class="col-12 col-sm-6 col-md-2 ">
                <img src={xiconocelular} alt="" class="img-fluid mx-auto d-block" ></img>
                <br></br>
                <img src={xcomprasseguras} alt=""  class="img-fluid mx-auto d-block"></img>
            </div>
            <div class="col-12 col-sm-6 col-md-2 ">
                <img src={xiconogps} alt="" class="img-fluid mx-auto d-block" ></img>
                <br></br>
                <img src={xdesdecualquier} alt=""  class="img-fluid mx-auto d-block"></img>
            </div>

            <div class="col-12 col-sm-6 col-md-2 d-none d-md-block" >
                <img src={xmujer} alt="" class="img-fluid mx-auto d-block imagenmujer"></img>
            </div>
            <div class="col-12 col-sm-12 col-md-12 	d-none d-sm-block d-md-none ">
                <img src={xmujer} alt="" class="img-fluid mx-auto d-block "></img>
            </div>
            <div class="col-12 col-sm-12 col-md-12 	d-block d-sm-none ">
                <img src={xmujer} alt="" class="img-fluid mx-auto d-block "></img>
            </div>
            


        </div>
        

        <div class="row hombre">
            <div class="col-12 col-sm-12 col-md-4">
                <img src={xhombre}  alt="" class="img-fluid mx-auto d-block" width="80%"></img>
            </div>
            <div class="col-12 col-sm-6 col-md-3 mx-auto  my-auto descuentospng">
           
                    <img src={xiconoflecha}  alt="" class="img-fluid d-inline iconoflechapng" width="15%"></img>
                    <img src={xdescuentos}  alt="" class="img-fluid  d-inline " width="60%"></img>
        
            </div>
            <div class="col-12 col-sm-6 col-md-5 my-auto">
                <button class="btn ms-5">
                    <img src={xcompraya}  alt="" class="img-fluid  d-block"></img>
                </button>
                <img src={xviawhatsapp}  alt="" class="img-fluid  d-block ms-5" width="40%"></img>
            </div>
        </div>


 
        <div class="row viajarhacia ">

            <div class="col-12 col-sm-5 col-5 ">
                <img src={xbushacia}  alt="" class=" img-fluid mx-auto d-inline mt-5"></img>
                <img src={xviajahacia}  alt="" class=" img-fluid d-inline viajahaciapng" width="50%"></img>
            </div>
            <div class="col-12 col-sm-2 col-md-2" >

            </div>
            <div class="col-12 col-sm-5 col-5 lineaspng">
                <br></br>
                <img src={xraipdo} alt="" class=" img-fluid r1 d-block"></img>
                <br></br>
                <img src={xfacil} alt="" class=" img-fluid  r2 d-block"></img>
                <br></br>
                <img src={xseguro} alt="" class=" img-fluid r3 d-block"></img>
            </div>

            <div class="col-6 col-sm-6 col-md-2">
                <img src={xprecioipiales}  alt="" class="img-fluid mx-auto d-block"></img>
            </div>
            <div class="col-6 col-sm-6 col-md-2">
                <img src={xpreciocali} alt="" class="img-fluid mx-auto d-block"></img>
            </div>
            <div class="col-6 col-sm-6 col-md-2">
                <img src={xpreciobogota}  alt="" class=" img-fluid mx-auto d-block"></img>
            </div>
            <div class="col-6 col-sm-6 col-md-2">
                <img src={xpreciomedellin} alt="" class=" img-fluid mx-auto d-block"></img>
            </div>

            <div class="col-12 col-sm-12 col-md-4 d-none d-md-block">
                <img src={xmujerprecio} alt="" class="img-fluid mx-auto d-block mujerpreciopng" ></img>
            </div>
            <div class="col-12 col-sm-12 col-md-4 	d-none d-sm-block d-md-none ">
                <img src={xmujerprecio}  alt="" class="img-fluid mx-auto d-block " ></img>
            </div>
            <div class="col-12 col-sm-12 col-md-4 	d-block d-sm-none ">
                <img src={xmujerprecio} alt="" class="img-fluid mx-auto d-block " ></img>
            </div>

        </div>




        <div class="row">
            
            <div class="col-12 col-sm-5 col-md-6 p-5">
                <img src={xlogonombre} alt="" class="img-fluid mx-auto d-block" width="80%"></img>
            </div>
            <div class="col-12 col-sm-3 col-md-3 pt-5">
                <div class="bordeviaja pt-5">
                    <img src={xviajaatrevete}  alt="" class="img-fluid mx-auto d-block" width="60%"></img>
                    <img src={xespera} alt="" class="img-fluid mx-auto d-block" width="60%"></img>
                </div>
            </div>

            <div class="col-12 col-sm-4 col-md-3 pt-5 pe-0 d-none d-md-block">
                <div class="hombreatrevetediv">
                    <img src={xhombreatrevete}  alt="" class="img-fluid  d-block mx-auto hombreatrevetepng" width="60%"></img>
                </div>
            </div>
            <div class="col-12 col-sm-4 col-md-3 pt-5 pe-0 d-none d-sm-block d-md-none">               
                <img src={xhombreatrevete} alt="" class="img-fluid  d-block mx-auto" width="60%"></img>           
            </div>
            <div class="col-12 col-sm-4 col-md-3 pt-5 pe-0 d-block d-sm-none">               
                <img src={xhombreatrevete}  alt="" class="img-fluid  d-block mx-auto" width="60%"></img>               
            </div>

        </div>

 
        <div class="row pie">
            <div class="col-12 col-sm-6 col-md-4 pt-5 ps-5">
                <img src={xcontactanospie} alt="" class="img-fluid mx-auto d-inline ps-5 " width="60%"></img>
                <a href="" class="btn">
                   
                    <Link to="/admin"> <img src={xiconopie} alt="" class="img-fluid mx-auto d-inline iconopiepng ms-5" ></img></Link>
                    
                </a>
            </div>
            <div class="col-12 col-sm-6 col-md-4 pt-5 ps-5">
                <img src={xiconowhatsapppie} alt="" class="img-fluid mx-auto d-inline " width="10%"></img>
                <img src={xnumeropie} alt="" class="img-fluid mx-auto d-inline" width="60%"></img>
            </div>
            <div class="col-12 col-sm-12 col-md-4  pt-5">
                <img src={xasesorpie} alt="" class="img-fluid mx-auto d-block"></img>
            </div>
        </div>


    </div>
        
        
        
    
    
    </React.Fragment>

 

  );
}

