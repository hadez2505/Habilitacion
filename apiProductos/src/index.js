const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require('cors');

const db = require('./models/database');

app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));

app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(require('./routes/productos.routes'));

app.listen(app.get('port'), () => {
	console.log('Server is in port', app.get('port'));
});
