const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myconnection = require('express-myconnection');

const app = express();

// Import routes
const customerRoutes = require('./routes/customer');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));

app.use(myconnection(mysql, {
    host: 'Localhost',
    user: 'root',
    password: 'dw4444dw',
    port: 3306,
    database: 'dbnodejsmysql'
}, 'single'));

app.use(express.urlencoded({extended: false}));

// Routes
app.use('/', customerRoutes);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
});