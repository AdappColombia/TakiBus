import React, { Component } from 'react';
import ScriptTag from 'react-script-tag';

class Pasarela extends Component {

    render(){

        return (

            <div className="App">   
            
                 <form>
                      <ScriptTag
                          src="https://checkout.epayco.co/checkout.js"
                          class="epayco-button"
                          data-epayco-key="491d6a0b6e992cf924edd8d3d088aff1"
                          data-epayco-amount="50000"
                          data-epayco-name="Vestido Mujer Primavera"
                          data-epayco-description="Vestido Mujer Primavera"
                          data-epayco-currency="cop"
                          data-epayco-country="co"
                          data-epayco-test="true"
                          data-epayco-external="false"
                          data-epayco-response="https://ejemplo.com/respuesta.html"
                          data-epayco-confirmation="https://ejemplo.com/confirmacion"
                          >
                      </ScriptTag>
                  </form>
            
            </div>
                 
                    
        );
    }
}

export default Pasarela;