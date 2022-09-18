import {Schema, model} from 'mongoose';

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
    value: {
        type: Number,
        //required: true,
    },
    activated: {
        type: Boolean,
        default: false,
    },
}
);

const SaveMoreDiscount = model('SaveMoreDiscount', SaveMoreDiscountSchema);

module.exports=SaveMoreDiscount;