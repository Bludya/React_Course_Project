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

    if(token){
      return res.status(401)
        .json({message: 'You are already logged in.'});
    }

    next();
    }
}
