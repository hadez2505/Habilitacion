import ContenRutas from './components/ContenRutas';
import MenuPrincipal from './components/MenuPrincipal';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';
import ProductosView from './views/ProductosView';

function App() {
	return (
		<Router>
			<Switch>
				<MenuPrincipal>
					<Route exact path='/productos' component={ProductosView} />
				</MenuPrincipal>

				{/* <ContenRutas /> */}
			</Switch>
		</Router>
	);
}

export default App;
