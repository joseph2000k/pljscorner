import { gql } from "@apollo/client";

const GET_PAYMENT_METHOD = gql`
  query PaymentMethod($paymentMethod: String) {
    paymentMethod(paymentMethod: $paymentMethod) {
      _id
      name
    }
  }
`;

export { GET_PAYMENT_METHOD };
