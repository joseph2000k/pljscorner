import {Schema, model} from 'mongoose';
  
export interface SaveMoreDiscount {
    title: string;
    buy: number;
    saveValue: number;
    activated: boolean;
}

const SaveMoreDiscountSchema = new Schema({
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
        //required: true,
    }],
    title: {
        type: String,
        //required: true,
    },
    buy: {
        type: Number,
        //required: true,
    },
    saveValue: {
        type: Number,
        //required: true,
    },
    activated: {
        type: Boolean,
        default: false,
        //required: true,
    },
}
);

const SaveMoreDiscount = model('SaveMoreDiscount', SaveMoreDiscountSchema);

module.exports=SaveMoreDiscount;