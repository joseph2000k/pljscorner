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
        receipt: async (_:void, args: { receiptInput: ReceiptType }) => {
            const newReceipt = new Receipt({
                ...args.receiptInput
            });
            const receipt = await newReceipt.save();
            
            return receipt;
    }
    }
}



