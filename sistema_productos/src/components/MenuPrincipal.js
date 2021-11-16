import React, {useState} from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Box,
	Drawer,
	Typography,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button';
import {createTheme, ThemeProvider} from '@mui/material/styles';

// ICONS
import ReceiptIcon from '@mui/icons-material/Receipt';
import HomeIcon from '@mui/icons-material/Home';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

//LOGIN
import {useAuth0} from '@auth0/auth0-react';
import {Link} from 'react-router-dom';

const obtenerEstilos = makeStyles((tema) => ({
	botonMenu: {
		marginRight: tema.spacing(2),
	},
	titulo: {
		flexGrow: 1,
	},
}));

const theme = createTheme({
	status: {
		danger: '#e53e3e',
	},
	palette: {
		primary: {
			main: '#FFC107',
			darker: '#053e85',
		},
		neutral: {
			main: '#64748B',
			contrastText: '#fff',
		},
	},
});

const MenuPrincipal = (props) => {
	const estilos = obtenerEstilos();

	// Manejo del estado del menú
	const [estadoMenu, setEstadoMenu] = useState(false);

	// rutina que desactiva el despliegue del menú
	const mostrarMenu = (estado) => () => {
		setEstadoMenu(estado);
	};

	const menu = () => (
		<Box
			sx={{width: 300}}
			role='presentation'
			onClick={mostrarMenu(false)}>
			<List subheader={<ListSubheader>Navegación</ListSubheader>}>
				<Link to='/home'>
					<ListItem button>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary='Home' />
					</ListItem>
				</Link>
				<Link to='/ventas'>
					<ListItem button>
						<ListItemIcon>
							<ReceiptIcon />
						</ListItemIcon>
						<ListItemText primary='Ventas' />
					</ListItem>
				</Link>
				<Link to='/productos'>
					<ListItem button>
						<ListItemIcon>
							<StoreMallDirectoryIcon />
						</ListItemIcon>
						<ListItemText primary='Productos' />
					</ListItem>
				</Link>
				<Link to='/usuarios'>
					<ListItem button>
						<ListItemIcon>
							<PeopleAltIcon />
						</ListItemIcon>
						<ListItemText primary='Usuarios' />
					</ListItem>
				</Link>
			</List>
		</Box>
	);

	return (
		<>
			<AppBar position='static'>
				<ThemeProvider theme={theme}>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							aria_label='Menu Principal'
							className={estilos.botonMenu}
							onClick={mostrarMenu(true)}>
							<MenuIcon />
						</IconButton>
						<Typography variant='h6' className={estilos.titulo}>
							Sistema de Ventas
						</Typography>

						<Button variant='contained' sx={{m: 0.5}}>
							Salir
						</Button>
					</Toolbar>
					<Drawer
						anchor='left'
						open={estadoMenu}
						onClose={mostrarMenu(false)}>
						{menu()}
					</Drawer>
				</ThemeProvider>
			</AppBar>
			<Box
				component='main'
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? theme.palette.grey[100]
							: theme.palette.grey[900],
					flexGrow: 1,
					height: '100vh',
					overflow: 'auto',
				}}>
				<Toolbar />
				{props.children}
			</Box>
		</>
	);
};

export default MenuPrincipal;
