const { eliminarEventoInscrito } = require('../repositories/implementation/authRepository');
const authService = require('../services/implementation/authService');

class authController {
  async login(req, res) {
    const { email, password } = req.body;
    const { body, validationResult } = require('express-validator');

    try {
      await body('email').isEmail().withMessage('Email inválido').run(req);
      await body('password').notEmpty().withMessage('La contraseña es requerida').run(req);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const auth = await authService.login(email, password);

      if (auth.token) {
        res.cookie('authToken', auth.token, {
          httpOnly: true, // Hace que la cookie no sea accesible desde el JavaScript del navegador
          secure: false,  // Cambia a true en producción con HTTPS
          maxAge: 3600000 // Tiempo de expiración en milisegundos (1 hora)
        });
        res.status(200).send({ message: 'Inicio de sesión exitoso' });
      } else {
        res.status(401).send({ message: 'Credenciales invalidas. Intente de nuevo...' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error en el servidor. Intente nuevamente.' });
    }
  }
  async renderLogin(req, res) {
    const message = req.query.message == 'token_expired' ? 'Tu sesión ha expirado. Inicia sesión nuevamente.' :
      req.query.message == 'token_invalid' ? 'El token es inválido. Inicia sesión nuevamente.' : req.query.message == 'invalid_credentials' ? 'Credenciales inválidas. Intenta nuevamente.' :
        null;
    res.render('login', { layout: false, message });
  }
  async logout(req, res) {
    res.clearCookie('authToken');
    res.redirect('/');
  }

  async perfil(req, res) {
    const users = await authService.getUserInfo(req.user.userId);
    const events = await authService.getEvents(req.user.userId);
    res.render('perfil/index', { users, events, user: req.user.userId, tipousuario: req.user.tipousuario, username: req.user.username });
  }

  async registro(req, res) {
    res.render('registro', { layout: false });
  }

  async postRegistro(req, res) {
    const { name, email, password, confirmPassword } = req.body;
    const { body, validationResult } = require('express-validator');

    try {
      await body('name')
        .notEmpty().withMessage('El nombre es requerido')
        .run(req);

      await body('email')
        .isEmail().withMessage('Email inválido')
        .run(req);

      await body('password')
        .notEmpty().withMessage('La contraseña es requerida')
        .run(req);

      await body('confirmPassword')
        .custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
          }
          return true;
        })
        .run(req);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      await authService.postRegistro(name, email, password);

      res.status(200).send({ message: 'Registro exitoso' });
    } catch (error) {
      res.status(500).send({ message: 'Error en el servidor. Intente nuevamente.' });
    }
  }

  async nosotros(req, res) {
    res.render('nosotros', { user: req.user.userId, tipousuario: req.user.tipousuario, username: req.user.username });
  }


  async eliminarEventoInscrito(req, res) {
    try {
      const eventoInscritoId = req.params.id;
      await eliminarEventoInscrito(eventoInscritoId);
          const users = await authService.getUserInfo(req.user.userId);
    const events = await authService.getEvents(req.user.userId);
res.render('perfil/index', { users, events, user: req.user.userId, tipousuario: req.user.tipousuario, username: req.user.username });
    } catch (error) {
      console.error('Error al eliminar el evento inscrito:', error);
      res.status(500).send('Error al eliminar el evento inscrito.');
    }
  }
}
module.exports = new authController();
