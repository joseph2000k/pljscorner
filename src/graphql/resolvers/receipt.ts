const Receipt = require('../../models/Receipt');
const Item = require('../../models/Item');
const Cart = require('../../models/Cart');
import { Receipt as ReceiptType } from "../../models/Receipt";

module.exports = {
    Query: {
        receipts: async () => {
            try {
                const receipts = await Receipt.find();
                return receipts;
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



