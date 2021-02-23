import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Cotizador from './Cotizador';
import Login from './login';
import Loginadmin from './Loginadmin';
import Admin from './Admin';
import Pasarela from './Pasarela'


const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Cotizador} />
			<Route path="/admin" component={Loginadmin} />
			<Route path="/adminApp" component={Admin} />
		</Switch>
	</BrowserRouter>
);

export default Router;

