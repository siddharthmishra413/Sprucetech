const { errorName } = require("../../../helper/message_format.helper");
const Role = require("../../../models/role.model");

module.exports = {
  createRole: async (args, req) => {
    try {
      if (!req.isAuth) throw new Error(errorName.user_unauthorized);
      if (!req.isAdmin) throw new Error(errorName.user_unauthorized);

      let userRole = args.roleInput.role.toLowerCase();
      const existingRole = await Role.findOne({
        role: userRole
      });

      if (existingRole) throw new Error(errorName.duplicate_role);

      const role = new Role({
        role: userRole
      });

      const result = await role.save();
      return result;
    } catch (err) {
      throw err;
    }
  },

  roles: async (args, req) => {
    try {
      //   if (!req.isAuth) throw new Error(errorName.user_unauthorized);
      //   if (!req.isAdmin) throw new Error(errorName.user_unauthorized);

      const roles = await Role.find();
      return roles;
    } catch (err) {
      throw err;
    }
  }
};
