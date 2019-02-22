const encryption = require('../util/encryption');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const tokenSecret = require('../config/config').tokenSecret;

module.exports = {
    register: (req, res) => {
        const {username, firstName, lastName, password, repeatPassword, profilePicture} = req.body;

        if(!username || !firstName || !lastName || !password || !repeatPassword){
          res.status(400)
            .json({message: 'Please fill all of the required fields.'});
          return;
        }

        if(password !== repeatPassword){
          res.status(400)
            .json({message: 'Password and repeatPassword don\'t match.'});
        }

        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, password);

        User.create({
            username,
            hashedPass,
            salt,
            firstName,
            lastName,
            profilePicture,
            roles: []
        })
        .then(() => {
          res.status(200)
            .json({message: 'User created successfully!'})
        })
        .catch((e) => {
          console.error(e);
          res.status(500)
            .json({message: 'User not created.'})
        })
    },
    login: async (req, res) => {
        const {username, password} = req.body;

        if(!username || !password){
          res.status(400)
            .json({message: 'Please fill all fields.'});
        }

        try {
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({message: 'User not found!'});
            }

            if (!user.authenticate(password)) {
              return res.status(401).json({message: 'Invalid password.'});
            }

            const token =
            jwt.sign(
              {
                username,
                userId: user._id.toString()
              },
              tokenSecret,
              {expiresIn: '24h'}
            );

            res.status(200)
            .json({message: 'Login successful!', token})
        } catch (e) {
          console.error(e);
            res.status(500)
              .json({message: 'Internal server error.'});
        }


    }
};
