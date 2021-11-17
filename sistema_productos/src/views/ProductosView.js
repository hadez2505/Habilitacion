import * as React from 'react';
import {Modal, Button} from 'react-bootstrap';
import Table from '@mui/material/Table';
import {
	Container,
	Grid,
	Paper,
	TableBody,
	TableCell,
	TableRow,
	TableHead,
	IconButton,
} from '@mui/material';
import axios from 'axios';
import {apiBaseUrl} from '../utils/Api';
import DatosCabeceraProductos from '../utils/DatosCabeceraProductos';
import Formulario from '../components/ProductoNuevo/Formulario';
import FormularioEdit from '../components/EditarProducto/FormularioEdit';
import {set} from 'react-hook-form';
import {notie} from 'notie';
import 'notie/dist/notie.css';

const ProductosView = () => {
	const [productos, setProductos] = React.useState([]);

	React.useEffect(async () => {
		let response = await axios.get(`${apiBaseUrl}`);

		setProductos(response.data);
	}, []);

	const setEstado = (estado) => {
		if (estado === 0) {
			return 'No disponible';
		} else {
			return 'Disponible';
		}
	};

	const Borrar = async (id) => {
		try {
			const {data} = await axios.delete(
				`http://localhost:3010/eliminar/${id}`
			);
			window.alert(data.msg);
		} catch (error) {}
	};

	const [show, setShow] = React.useState(false);
	const [showEdit, setShowEdit] = React.useState(false);
	const [producto, setProducto] = React.useState({});

	const handleShow = () => setShow(true);
	const handleShowEdit = () => setShowEdit(true);

	const handleClose = () => setShow(false);
	const handleCloseEdit = () => setShowEdit(false);

	const Editar = (item) => {
		setProducto(item);
		handleShowEdit();
	};

	return (
		<>
			<Container maxWidth='lg' sx={{mt: 4, mb: 4}}>
				<div className='col-sm-6'>
					<div className='col-sm-6'>
						<Button
							onClick={handleShow}
							className='btn btn-primary'
							data-toggle='modal'>
							<i className='material-icons'>&#xE147;</i>{' '}
							<span>Nuevo Producto</span>
						</Button>
					</div>
				</div>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Paper
							sx={{
								p: 2,
								display: 'flex',
								flexDirection: 'column',
							}}>
							<Table size='small'>
								<TableHead>
									<TableRow>
										{DatosCabeceraProductos.map((item) => {
											return <TableCell>{item.nombre}</TableCell>;
										})}
									</TableRow>
								</TableHead>
								<TableBody>
									{productos.map((item) => {
										return (
											<TableRow>
												<TableCell>{item.Id}</TableCell>
												<TableCell>{item.description}</TableCell>
												<TableCell>{item.valor_unitario}</TableCell>
												<TableCell>
													{setEstado(item.estado)}
												</TableCell>

												<TableCell>
													<IconButton
														title='Edit'
														color='warning'
														onClick={() => Editar(item)}>
														<i className='material-icons'>&#xE254;</i>
													</IconButton>
													{/* <a
														href='#'
														className='edit'
														title='Edit'
														data-toggle='tooltip'>
														<i className='material-icons'>&#xE254;</i>
													</a> */}
													<IconButton
														title='Delete'
														color='error'
														onClick={() => Borrar(item.id)}>
														<i className='material-icons'>&#xE872;</i>
													</IconButton>
													{/* <a
														href='#'
														className='delete'
														title='Delete'
														data-toggle='tooltip'>
														<i className='material-icons'>&#xE872;</i>
													</a> */}
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>

							<Modal show={show} onHide={handleClose}>
								<Modal.Header>
									<Modal.Title>Nuevo Producto</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Formulario />
								</Modal.Body>
								<Modal.Footer>
									<Button variant='secondary' onClick={handleClose}>
										Cerrar
									</Button>
								</Modal.Footer>
							</Modal>

							<Modal show={showEdit} onHide={handleCloseEdit}>
								<Modal.Header>
									<Modal.Title>Editar Producto</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<FormularioEdit producto={producto} />
								</Modal.Body>
								<Modal.Footer>
									<Button
										variant='secondary'
										onClick={handleCloseEdit}>
										Cerrar
									</Button>
								</Modal.Footer>
							</Modal>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default ProductosView;
