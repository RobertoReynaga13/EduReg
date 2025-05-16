require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token || typeof token !== 'string') {
    return res.redirect('/?message=token_expired');
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;

    console.log('============= U S U A R I O - INI');
    console.log(decoded);
    console.log(decoded.username);
    console.log('============= U S U A R I O - FIN');

    next();
  } catch (error) {
    res.clearCookie('authToken');
    return res.redirect('/?message=token_invalid');
  }
};

module.exports = authMiddleware;