const User = require('../models/User');

module.exports = {
  isAuthed: (req, res, next) => {
    let token = req.token;

    if(!token){
      return res.status(401)
        .json({message: 'No or invalid token.'});
    }

    next();
  },
	isAnonymous: (req, res, next) => {
    let token = req.token;

    console.log(token);
    if(token){
      return res.status(401)
        .json({message: 'You are already logged in.'});
    }

    next();
  },
  isAdmin: (req, res, next) => {
    let userId = req.token.userId;

    User.findById(userId)
      .then(user => {
        if(user.roles.indexOf('Admin') == -1){
          return res.status(401)
            .json({message: 'You are already logged in.'});
        }

        next();
      })
  }

}
