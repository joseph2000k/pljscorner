import { useReducer, createContext } from "react";
const initialState = {
  total: 0,
};

const PaymentContext = createContext<any>({
  total: 0,
  addTotal: () => {},
  newPayment: () => {},
});

function paymentReducer(state: any, action: any) {
  switch (action.type) {
    case "ADD_TOTAL":
      return {
        ...state,
        total: action.payload,
      };
    case "NEW_PAYMENT":
      return {
        ...state,
        total: 0,
      };
    default:
      return state;
  }
}

function PaymentProvider(props: any) {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  const addTotal = (paymentData: any) => {
    dispatch({
      type: "ADD_TOTAL",
      payload: paymentData,
    });
  };

  const newPayment = () => {
    dispatch({
      type: "NEW_PAYMENT",
    });
  };

  return (
    <PaymentContext.Provider
      value={{ total: state.total, addTotal, newPayment }}
      {...props}
    />
  );
}

export { PaymentContext, PaymentProvider };
