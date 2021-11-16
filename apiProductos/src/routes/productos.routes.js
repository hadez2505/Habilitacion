const {Router} = require('express');
const router = Router();

const {
	getProductos,
	setProducto,
	actualizarProducto,
	eliminarProducto,
	getProducto,
} = require('../controllers/productos');

router.get('/', getProductos);

router.post('/add', setProducto);

router.post('/actualizar/:id', actualizarProducto);

router.delete('/eliminar/:id', eliminarProducto);

router.get('/buscar/:id', getProducto);

module.exports = router;
