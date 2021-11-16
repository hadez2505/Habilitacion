const {response} = require('express');

const pool = require('../models/database');

const getProductos = async (req, resp = response) => {
	const productos = await pool.query('SELECT * FROM productos');
	resp.json(productos);
};
const setProducto = async (req, resp = response) => {
	console.log(req.body);
	try {
		const {id, description, valor_unitario, estado} = req.body;
		const newProduct = {
			id: parseInt(id),
			description,
			valor_unitario: parseFloat(valor_unitario),
			estado: parseInt(estado),
		};
		console.log(newProduct);
		await pool.query('INSERT INTO productos set ?', [newProduct]);

		resp.status(200).json({
			estatus: true,
			msg: 'PRODUCTO CREADO CON EXITO',
		});
	} catch (error) {
		if (error.code === 'ER_DUP_ENTRY') {
			resp.status(401).json({
				estatus: false,
				msg: 'CODIGO DE BARRAS REPETIDO INGRESE UN0 VALIDO',
			});
		}
		console.log(error);
	}
};
const actualizarProducto = async (req, resp = response) => {
	console.log(req.params);
	console.log(req.body);
	try {
		const {id} = req.params;
		const producto = await pool.query(
			'SELECT * FROM productos WHERE Id = ?',
			[id]
		);
		if (producto.length === 0) {
			resp.json({
				msg: 'producto no encontrado ingrese un codigo de barras valido',
			});
		}
		const {
			id: codigo,
			description,
			valor_unitario,
			estado,
		} = req.body;
		const newProduct = {
			id: parseInt(codigo),
			description,
			valor_unitario: parseFloat(valor_unitario),
			estado: parseInt(estado),
		};
		await pool.query('UPDATE productos set ? WHERE id = ?', [
			newProduct,
			id,
		]);
		resp.status(200).json({
			estatus: true,
			msg: 'PRODUCTO ACTUALIZADO CON EXITO',
		});
	} catch (error) {
		console.log(error);
	}
};
const eliminarProducto = async (req, resp = response) => {
	console.log(req.params);
	try {
		const {id} = req.params;
		const producto = await pool.query(
			'SELECT * FROM productos WHERE Id = ?',
			[id]
		);
		if (producto.length === 0) {
			resp.json({
				msg: 'producto no encontrado ingrese un codigo de barras valido',
			});
		}
		await pool.query('DELETE FROM productos WHERE id = ?', [id]);
		resp.status(200).json({
			msg: 'PRODUCTO ELIMINADO CON EXITO',
		});
	} catch (error) {}
};
const getProducto = async (req, resp = response) => {
	let {id} = req.params;
	const producto = await pool.query(
		'SELECT * FROM productos WHERE id = ?',
		[id]
	);
	if (producto.length === 0) {
		resp.json({
			msg: 'NO SE ENCONTRO PRODUCTOS CON ESE CODIGO DE BARRAS',
		});
	}

	resp.json(producto);
};

module.exports = {
	getProductos,
	setProducto,
	actualizarProducto,
	eliminarProducto,
	getProducto,
};
