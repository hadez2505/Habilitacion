import {TextField, Button} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import {Form, FormGroup, FormSelect} from 'react-bootstrap';

import React from 'react';
import {useForm} from 'react-hook-form';

import notie from 'notie';
import 'notie/dist/notie.css';

const obtenerEstilos = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: theme.spacing(2),

		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '300px',
		},
		'& .MuiButtonBase-root': {
			margin: theme.spacing(2),
		},
	},
}));

const FormularioEdit = ({producto}) => {
	// console.log(producto);
	const {
		id: codigo,
		description: des,
		valor_unitario: vu,
		estado: est,
	} = producto;
	const estilos = obtenerEstilos();

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm();
	const onSubmit = async ({
		id,
		description,
		valor_unitario,
		estado,
	}) => {
		try {
			const {status, data} = await axios.post(
				`http://localhost:4000/actualizar/${id}`,
				{
					id: parseInt(id),
					description: description,
					valor_unitario: parseFloat(valor_unitario),
					estado: parseInt(estado),
				}
			);
			console.log(status);
			console.log(data);
			if (status === 200) {
				notie.alert({text: data.msg, type: 'success', time: 5});
			}
		} catch (error) {
			console.log(error);
		}
	};
	// console.log(errors);

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className={estilos.root}>
			<TextField
				type='text'
				placeholder='Codigo de Barras'
				autoFocus
				value={codigo}
				{...register('id', {})}
			/>
			<TextField
				type='text'
				placeholder='Descripcion'
				defaultValue={des}
				{...register('description', {})}
			/>
			<TextField
				type='text'
				placeholder='Valor Por Unidad'
				defaultValue={vu}
				{...register('valor_unitario', {})}
			/>

			<FormGroup className='mb-3'>
				<FormSelect
					aria-label='Default select example'
					label='Estado'
					defaultValue={est}
					{...register('estado', {})}>
					<option value='1'>Disponible</option>
					<option value='0'>No Disponible</option>
				</FormSelect>
			</FormGroup>
			<Button type='submit'>Enviar</Button>
		</Form>
	);
};

export default FormularioEdit;
