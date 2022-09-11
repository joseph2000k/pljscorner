const Receipt = require('../../models/Receipt');
const Cart = require('../../models/Cart');
const User = require('../../models/User');
import { Receipt as ReceiptType } from "../../models/Receipt";

module.exports = {
    Query: {
        receipts: async (_:void, args: void, {user}: any) => {
            try {
                const role = await User.findById(user.id).select('role');

                if (role.role === 'admin') {
                    return await Receipt.find().sort({ date: -1 }).populate('cashier', 'username');
                } else {
                    return  await Receipt.find({ cashier: user.id }).sort({ date: -1 }).populate('cashier', 'username');
                }

            } catch (err) {
                throw err;
            }
                
            }
        },
    Mutation: {
        receipt: async (_:void, args: { receiptInput: ReceiptType }, {user}: any) => {
            const { total, items, cash, paymentmethod, referencenumber } = args.receiptInput;

            const cart = await Cart.findOne({user: user.id});

            if(!cart) {
                return new Error('Cart not found');
            }
            
            if(!cash) {
                return new Error('Cash is required');
            }

            if(cash < total) {
                return new Error('Cash is less than total');
            }


            const transaction = {
                change: cash - total,
                cash,
                total,
                items,
                cashier: user.id,
                date: new Date().toISOString(),
                time: new Date().toISOString(),
                receiptnumber: Math.floor(Math.random() * 1000000000),
                paymentmethod,
                referencenumber,
            }

            const newReceipt = new Receipt({
                ...transaction
            });
            const receipt = await newReceipt.save();

            cart.items = [];
            await cart.save();
            
            return receipt;
    }
    }
}



