const Receipt = require('../../models/Receipt');
const Item = require('../../models/Item');
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
            
            if(!cash) {
                throw new Error('Cash is required');
            }

            const transaction = {
                change: cash - total,
                cash,
                total,
                items,
                cashier: user.id,
                date: new Date().toISOString(),
                time: new Date().toISOString(),
                paymentmethod,
                referencenumber,
            }

            const newReceipt = new Receipt({
                ...transaction
            });
            const receipt = await newReceipt.save();
            
            return receipt;
    }
    }
}



