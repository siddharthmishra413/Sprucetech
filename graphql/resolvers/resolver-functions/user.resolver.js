const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const roleResolver = require("./role.resolver");
const { errorName } = require("../../../helper/message_format.helper");
const { sendEmail } = require("../../../helper/sendEmail.helper");
const User = require("../../../models/user.model");
var privateKey = fs.readFileSync(process.env.PRIVATE_KEY);

module.exports = {
  signup: async args => {
    try {
      const existingUser = await User.findOne({
        userName: args.userInput.userName
      });
      if (existingUser) {
        throw new Error(errorName.duplicate_user_error);
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const userRole = [];

      userRole.push({ role: "user" });

      const user = new User({
        firstName: args.userInput.firstName,
        lastName: args.userInput.lastName,
        userName: args.userInput.userName,
        password: hashedPassword,
        title: args.userInput.title,
        companyName: args.userInput.companyName,
        companyAddress: args.userInput.companyAddress,
        telephone: args.userInput.telephone,
        userRole: [...userRole]
      });

      const result = await user.save();

      return result;
    } catch (err) {
      throw err;
    }
  },

  login: async ({ userName, password }) => {
    try {
      const user = await User.findOne({ userName: userName }).select(
        "firstName lastName userName password title companyName companyAddress telephone userRole"
      );

      if (!user) {
        throw new Error(errorName.user_doesnt_exist);
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error(errorName.user_doesnt_exist);
      }
      //let token = jwt.sign(user, privateKey, { algorithm: 'ES512' }, { expiresIn: '1h' });
      let token = jwt.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: "1h"
      });

      return { ...user._doc, token: token, tokenExpiration: 1 };
    } catch (err) {
      throw err;
    }
  },

  userDetail: async (args, req) => {
    const user = await User.findOne({ _id: args.id });
    if (!user) throw new Error(errorName.user_doesnt_exist);
    let rolesArray = await roleResolver.roles();
    user.role = rolesArray.map(element => element.role);
    return user;
  },

  users: async (args, req) => {
    try {
      if (!req.isAuth) throw new Error(errorName.user_unauthorized);
      if (!req.isAdmin) throw new Error(errorName.user_unauthorized);

      const users = await User.find();
      if (!users) throw new Error(errorName.intrnal_server_error);

      return users;
    } catch (err) {
      throw err;
    }
  },

  forgotPassword: async ({ userName }) => {
    try {
      let user = await User.findOne({ userName });
      if (!user) throw new Error(errorName.user_doesnt_exist);
      user.refreshTokenForPassword = jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      let userData = await user.save();
      //let html = createHtml(data)
      // let emaiResolverMessage = await sendEmail(user.userName, html);
      // if (emaiResolverMessage == 'Email Not Sent') throw new Error(errorName.intrnal_server_error);
      let data = {
        message: "Verification Link has been sent to your email",
        link: "/reset-password/" + userData.refreshTokenForPassword
      };
      return data;
    } catch (err) {
      throw err;
    }
  },

  tokenVerification: async ({ refreshTokenForPassword }) => {
    try {
      let user = await User.findOne({ refreshTokenForPassword });
      if (!user) throw new Error(errorName.user_doesnt_exist);

      let verification = jwt.verify(
        refreshTokenForPassword,
        process.env.SECRET_KEY
      );
      if (!verification) throw new Error(errorName.token_expired);

      let data = { userName: user.userName, userId: user._id };
      return data;
    } catch (err) {
      throw err;
    }
  },

  passwordReset: async ({ refreshToken, userId, newPassword }) => {
    try {
      let verification = jwt.verify(refreshToken, process.env.SECRET_KEY);
      if (!verification) throw new Error(errorName.token_expired);

      const hashedPassword = await bcrypt.hash(newPassword, 12);

      let result = await User.findByIdAndUpdate(
        { _id: userId },
        { password: hashedPassword }
      );
      if (!result) throw new Error(errorName.user_doesnt_exist);

      let data = { message: "Password Updated Successfully" };
      return data;
    } catch (err) {
      throw err;
    }
  }
};

let createHtml = userData => {
  let html =
    "Hello <strong>" +
    userData.userName +
    ",</strong><br><br> Please click on the link to reset your password  <a href='http://localhost:3001/reset-password" +
    userData.refreshTokenForPassword +
    "'> http://localhost:3001/reset-password</a>";
  return html;
};
