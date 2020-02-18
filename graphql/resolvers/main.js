const userResolver = require("./resolver-functions/user.resolver");
const itemResolver = require("./resolver-functions/item.resolver");
const roleResolver = require("./resolver-functions/role.resolver");

const rootResolver = {
  ...userResolver,
  ...itemResolver,
  ...roleResolver
};

module.exports = rootResolver;
