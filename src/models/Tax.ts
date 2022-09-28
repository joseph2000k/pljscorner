import {Schema, model} from 'mongoose';

export interface Tax {
    name: string;
    value: number;
}

const TaxSchema = new Schema<Tax>({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    }
}
);

const Tax = model('Tax', TaxSchema);

module.exports=Tax;