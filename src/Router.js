import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Cotizador from './Cotizador';
import Login from './login';
import Loginadmin from './Loginadmin';
import Admin from './Admin';
import Pasarela from './Pasarela'
import Exitocompra from './Exitocompra'


const Router = () => (
	<BrowserRouter>
		<Switch>

			<Route exact path="/" component={Cotizador} />
			<Route path="/admin" component={Loginadmin} />
			<Route path="/adminApp" component={Admin} />
			<Route path="/exitocompra" component={Exitocompra} />
			<Route path="/reservas" component={Admin} />
			<Route path="/compras" component={Admin} />

		</Switch>
	</BrowserRouter>
);

export default Router;

