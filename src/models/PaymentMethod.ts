import {Schema, model} from 'mongoose';

export interface PaymentMethod {
    name: string;
    image: string;
}

const PaymentMethodSchema = new Schema<PaymentMethod>({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}
);

const PaymentMethod = model('PaymentMethod', PaymentMethodSchema);

module.exports = PaymentMethod;





