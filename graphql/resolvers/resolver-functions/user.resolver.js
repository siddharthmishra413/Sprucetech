const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { errorName } = require('../../../helper/message_format.helper')
const User = require('../../../models/user.model');

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

            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err
        }
    }


}
