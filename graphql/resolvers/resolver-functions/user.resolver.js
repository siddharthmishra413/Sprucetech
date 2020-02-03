const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const { errorName } = require('../../../helper/message_format.helper')
const User = require('../../../models/user.model');
var privateKey = fs.readFileSync(process.env.PRIVATE_KEY);

module.exports = {

    signup: async args => {
        try {
            const existingUser = await User.findOne({ userName: args.userInput.userName });
            if (existingUser) {
                throw new Error(errorName.duplicate_user_error);
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                userName: args.userInput.userName,
                password: hashedPassword,
                title: args.userInput.title,
                companyName: args.userInput.companyName,
                companyAddress: args.userInput.companyAddress,
                telephone: args.userInput.telephone,
                userRole: args.userInput.userRole
            });

            const result = await user.save();

            return result 
        } catch (err) {
            throw err
        }
    },

    login: async ({ userName, password }) => {
        try {
            const user = await User.findOne({ userName: userName }).select('firstName lastName userName password title companyName companyAddress telephone userRole');

            if (!user) {
                throw new Error(errorName.user_doesnt_exist);
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                throw new Error(errorName.user_doesnt_exist);
            }
            //let token = jwt.sign(user, privateKey, { algorithm: 'ES512' }, { expiresIn: '1h' });
            let token = jwt.sign({ user }, 'somesupersecretkey', { expiresIn: '1h' });

            return { ...user._doc, token: token, tokenExpiration: 1 };
        }
        catch (err) {
            throw err
        }
    },

    users: async (args, req) => {
        try {
            // req.isAdmin = true;
            // req.isAuth = true
            // if (!req.isAuth) throw new Error(errorName.user_unauthorized)
            // if (!req.isAdmin) throw new Error(errorName.user_unauthorized)

            const users = await User.find();

            return users;
        } catch (err) {
            throw err
        }
    }


}
