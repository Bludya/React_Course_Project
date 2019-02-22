const tokenSecret = require('../config/config').tokenSecret;
const jwt = require('jsonwebtoken');

module.exports =  (req, res, next) => {
  const authHeader = req.get('Authorization')
  if(!authHeader){
    next();
    return;
  }

  let decodedToken;
  try{
    decodedToken = jwt.verify(authHeader.split(' ')[1], tokenSecret);
  } catch(e){
    next();
    return;
  }

  req.token = decodedToken;
  next();
}
