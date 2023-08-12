const jwt = require('jsonwebtoken');
const userModel = require('../mongodb/models/User');

const requireAuth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  // console.log(authHeader);

  if (authHeader) {
    const token = authHeader.replace('Bearer ', ''); // Remove 'Bearer ' prefix
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
      if (err) {
        // console.log(err.message);
        res.redirect('/login');
      } else {
        // console.log(decodedToken);
        // Store the user ID in the request object
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

const checkUser = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (authHeader) {
    const token = authHeader.replace('Bearer ', ''); // Remove 'Bearer ' prefix
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await userModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
