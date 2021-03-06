const encryption = require('../util/encryption');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const tokenSecret = require('../config/config').tokenSecret;

module.exports = {
    register: (req, res) => {
        const {username, password, repeatPassword} = req.body;

        if(!username || !password || !repeatPassword){
          res.status(400)
            .json({error: 'Please fill all of the required fields.'});
          return;
        }

        if(password !== repeatPassword){
          res.status(400)
            .json({error: 'Password and repeatPassword don\'t match.'});
        }

        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, password);

        User.create({
            username,
            hashedPass,
            salt,
            roles: []
        })
        .then(() => {
          res.status(200)
            .json({message: 'User created successfully!'})
        })
        .catch((e) => {
          console.error(e);
          res.status(500)
            .json({error: 'User not created.'})
        })
    },
    login: async (req, res) => {
        const {username, password} = req.body;

        if(!username || !password){
          res.status(400)
            .json({error: 'Please fill all fields.'});
            return;
        }

        try {
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({error: 'User not found!'});
            }

            if (!user.authenticate(password)) {
              return res.status(401).json({error: 'Invalid password.'});
            }

            const token ='Bearer ' +
            jwt.sign(
              {
                username,
                userId: user._id.toString()
              },
              tokenSecret,
              {expiresIn: '24h'}
            );

            res.status(200)
            .json({message: 'Login successful!', token, username, isAdmin: user.roles.indexOf('Admin') > -1})
        } catch (e) {
          console.error(e);
            res.status(500)
              .json({error: 'Internal server error.'});
        }


    },
    getAllUsers: (req, res) => {
      User.find()
        .then(users => {
          res.status(200)
            .json(users);
        })
        .catch (e => {
          console.error(e);
            res.status(500)
              .json({error: 'Internal server error.'});
        })
    },
    getUsersByUsername: (req, res) => {
      let searchUsername = req.query.searchString;
      User.find({ "username": { "$regex": searchUsername, "$options": "i" } })
        .then(users => {
          res.status(200)
            .json(users);
        })
    },
    banUser: (req, res) => {
      let userId = req.params.id;
      let banState = req.body.banState;

      console.log(banState);
      User.findById(userId)
        .then(user => {
          user.banned = banState;
          user.save();

          res.status(200)
            .json({message: `User ${user.username} ${user.banned ? 'banned' : 'unbanned'} successfully.`, user});
        })
        .catch (e => {
          console.error(e);
            res.status(500)
              .json({error: 'Internal server error.'});
        });
    },
    makeAdmin: (req, res) => {
      let userId = req.params.id;

      User.findById(userId)
        .then(user => {
          if(user.roles.indexOf('Admin') < 0){
            user.roles.push('Admin');
            user.save();

            res.status(200)
              .json({message: `User ${user.username} made Admin successfully.`, user});
          }else {
            res.status(200)
              .json({error: `User ${user.username} is already admin.`, user});
          }
        })
        .catch (e => {
          console.error(e);
            res.status(500)
              .json({error: 'Internal server error.'});
        })
    },
};
