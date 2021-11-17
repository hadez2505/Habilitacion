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

const Formulario = () => {
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
				'http://localhost:3010/add',
				{
					id: parseInt(id),
					description: description,
					valor_unitario: parseFloat(valor_unitario),
					estado: parseInt(estado),
				}
			);
			if (status === 200) {
				notie.alert({text: data.msg, type: 'success', time: 5});
			}
		} catch (error) {
			if (error.response.status === 401) {
				notie.alert({
					text: error.response.data.msg,
					type: 'warning',
					time: 10,
				});
			}
		}
	};
	console.log(errors);

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className={estilos.root}>
			<TextField
				type='text'
				placeholder='Codigo de Barras'
				autoFocus
				{...register('id', {})}
			/>
			<TextField
				type='text'
				placeholder='Descripcion'
				{...register('description', {})}
			/>
			<TextField
				type='text'
				placeholder='Valor Por Unidad'
				{...register('valor_unitario', {})}
			/>

			<FormGroup className='mb-3'>
				<FormSelect
					aria-label='Default select example'
					label='Estado'
					{...register('estado', {})}>
					<option value='1'>Disponible</option>
					<option value='0'>No Disponible</option>
				</FormSelect>
			</FormGroup>
			<Button type='submit'>Enviar</Button>
		</Form>
	);
};

export default Formulario;
