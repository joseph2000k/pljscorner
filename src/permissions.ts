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
    },
    Mutation: {
        register: allow,
        addPaymentMethod: isAdmin,
        addShop: isAdmin,
        addItem: isAdmin,
        singleUpload: isAdmin,
        receipt: or(isAdmin, isUser),
    }
},
);
