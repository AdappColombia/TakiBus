import React from 'react'; 

import Formcotizador from './Formcotizador';


//CARGO LOGOS
import nav from './imagenes/nav.png'
import vive from './imagenes/vive.png'


export default function ElevateAppBar(props) {


  return (
    <React.Fragment>


    

    <nav className=" navbar-dark bg-dark"> 
        <img src={nav} alt="nav" className="img-fluid"/>
    </nav>
     <img src={vive} alt="presentacion vive" className="img-fluid"/>
    <br/><br/>


    <Formcotizador/>
    
    </React.Fragment>
  );
}

