import {rule, shield, allow, or} from 'graphql-shield';
const User = require('./models/User');


const isAdmin = rule({cache: 'contextual'})(async(parent, args, ctx, info) => {
    const user = await User.findById(ctx.user.id);
    return user.role === 'admin';
}
);

const isUser = rule({cache: 'contextual'})(async(parent, args, ctx, info) => {
    const user = await User.findById(ctx.user.id);
    return user.role === 'user';
}
);


export const permissions = shield({
    Query: {
        viewer: or(isAdmin, isUser),
        paymentMethods: or(isAdmin, isUser),
        user: isAdmin,
        shops: or(isAdmin, isUser),
        getItems: or(isAdmin, isUser),
        getItemsByCategory: or(isAdmin, isUser),
        getCategory: or(isAdmin, isUser),
        hello: allow,
        getCart: or(isAdmin, isUser),
        getTotal: or(isAdmin, isUser),
        receipts: or(isAdmin, isUser),
        receipt: or(isAdmin, isUser),
        getBMSDiscount: or(isAdmin, isUser),
        getBMSDiscounts: or(isAdmin, isUser),
        getSMDiscounts: or(isAdmin, isUser),
        numberOfItemsInCart: or(isAdmin, isUser),
        viewDiscountedItems: or(isAdmin, isUser)
    },
    Mutation: {
        register: allow,
        addPaymentMethod: isAdmin,
        addShop: isAdmin,
        addItem: isAdmin,
        singleUpload: isAdmin,
        receipt: or(isAdmin, isUser),
        addToCart: or(isAdmin, isUser),
        removeFromCart: or(isAdmin, isUser),
        removeFromCartDiscount: or(isAdmin, isUser),
        addBMSDiscount: isAdmin,
        createSMDiscount: isAdmin,
        addSMDItem: isAdmin,
        addDiscountedItemToCart: or(isAdmin, isUser)
    }
},
);
