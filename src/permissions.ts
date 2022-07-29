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
    },
    Mutation: {
        register: allow,
        addPaymentMethod: isAdmin,
        addShop: isAdmin,
    }
},
);