import {Schema, model} from 'mongoose';

export interface PaymentMethod {
    name: string;
    image: string;
    qr: string;
}

const PaymentMethodSchema = new Schema<PaymentMethod>({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    qr: {
        type: String,
    }
}
);

const PaymentMethod = model('PaymentMethod', PaymentMethodSchema);

module.exports = PaymentMethod;





