const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const blogController = require('./src/controllers/blogController');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/authRoutes');
const organizerRoutes = require('./src/routes/organizerRoutes');
const racingRoutes = require('./src/routes/racingRoutes');
const userRoutes = require('./src/routes/userRoutes');
const countryRoutes = require('./src/routes/countryRoutes');
const locationRoutes = require('./src/routes/locationRoutes');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const blogRoutes = require('./src/routes/blogRoutes');

require('./src/helpers/jsonHelper');

const app = express();

app.engine('hbs', engine({
  extname: '.hbs',
  helpers: handlebars.helpers
}));

app.set('view engine', 'hbs');
app.use('/public', express.static(path.join(__dirname, 'src','public')));

// Configurar el directorio de vistas
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'src', 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', authRoutes);
app.use('/', organizerRoutes);
app.use('/', racingRoutes);
app.use('/', userRoutes);
app.use('/', countryRoutes);
app.use('/', locationRoutes);
app.use('/', blogRoutes);


app.listen(3000, () => {
    console.log('🚀 Servidor ejecutándose en http://localhost:3000 🚀');
});
