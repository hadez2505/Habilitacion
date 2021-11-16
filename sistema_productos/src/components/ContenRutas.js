import React from 'react';
import {Route, Switch} from 'react-router-dom';

import ProductosView from '../views/ProductosView';

const ContenRutas = () => {
	return (
		<>
			<Switch>
				<Route exact path='/productos' element={ProductosView} />
			</Switch>
		</>
	);
};

export default ContenRutas;
