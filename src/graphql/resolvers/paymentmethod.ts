const PaymentMethod = require('../../models/PaymentMethod');
const User = require('../../models/User');
import {PaymentMethod as PaymentMethodType} from '../../models/PaymentMethod';


module.exports = {
    Query: {
        paymentMethods: async (_: void, args: void, {user}: any) => {
            try {
                const currentUser = await User.findById(user.id);
                if(!currentUser) {
                    return new Error('User Not Found');
                }
                const paymentmethods = await PaymentMethod.find();
                return paymentmethods;
            } catch (err) {
                throw err;
            }
        },
        paymentMethod: async (_: void, {paymentMethod}: any) => {
            try {
                const paymentMethodName = await PaymentMethod.findOne({name: paymentMethod});
                if(!paymentMethodName) {
                    return new Error('Payment Method Not Found');
                }
                return paymentMethodName;
            } catch (err) {
                throw err;
            }
        }
    },
    Mutation: {
        async addPaymentMethod (_: void, args: {paymentMethodInput: PaymentMethodType}, {user}: any) {
            try {
                const currentUser = await User.findById(user.id);
                if(!currentUser) {
                    return new Error('User not found');
                }

                const newPaymentMethod = new PaymentMethod({
                    name: args.paymentMethodInput.name,
                    image: args.paymentMethodInput.image,
                });

                const paymentMethod = await newPaymentMethod.save();
                return paymentMethod;
                
            } catch (error) {
                throw error;
            }
            }
        }
    }
