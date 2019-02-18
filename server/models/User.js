const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const defaultProfilePicture = "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fblog.ramboll.com%2Ffehmarnbelt%2Fwp-content%2Fthemes%2Framboll2%2Fimages%2Fprofile-img.jpg&f=1";

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    firstName: { type: mongoose.Schema.Types.String, required: true },
    lastName: { type: mongoose.Schema.Types.String, required: true },
    teams:[{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
    profilePicture: {type: mongoose.Schema.Types.String, default: defaultProfilePicture},
    salt: { type: mongoose.Schema.Types.String, required: true },
    roles: [{ type: mongoose.Schema.Types.String, default: 'User'}]
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
    try {
        let users = await User.find();
        if (users.length > 0) return;
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, '123');
        return User.create({
            username: 'admin',
            firstName: 'Anonymous',
            lastName: 'Could be anyone',
            salt,
            hashedPass,
            roles: ['Admin']
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = User;
