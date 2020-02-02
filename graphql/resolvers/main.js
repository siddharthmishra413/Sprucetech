const userResolver = require('./resolver-functions/user.resolver');
const itemResolver = require('./resolver-functions/item.resolver');

const rootResolver = {
    ...userResolver,
    ...itemResolver
}

module.exports = rootResolver;