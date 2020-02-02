const { errorName } = require('../../../helper/message_format.helper')
const Item = require('../../../models/item.model');

module.exports = {

    createItem: async (args, req) => {
        try {
            let { name, description, price, image } = args.itemInput;
            const item = new Item({
                name,
                description,
                price,
                image
            });
            const result = await item.save();
            return result
        }
        catch (err) {
            throw err
        }
    },

    items: async (args, req) => {
        try {
            // req.isAdmin = true;
            // req.isAuth = true
            if (!req.isAuth) throw new Error(errorName.user_unauthorized)
            if (!req.isAdmin) throw new Error(errorName.user_unauthorized)
            const items = await Item.find();
            return items;
        } catch (err) {
            throw err
        }
    }
}