import { useReducer, createContext } from "react";
const initialState = {
  total: 0,
  numberOfItems: 0,
};

const PaymentContext = createContext<any>({
  total: 0,
  numberOfItems: 0,
  addTotal: () => {},
  addNumberOfItems: () => {},
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
    case "ADD_NUMBER_OF_ITEMS":
      return {
        ...state,
        numberOfItems: action.payload,
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

  const addNumberOfItems = (numberOfItemsData: any) => {
    dispatch({
      type: "ADD_NUMBER_OF_ITEMS",
      payload: numberOfItemsData,
    });
  };

  const newPayment = () => {
    dispatch({
      type: "NEW_PAYMENT",
    });
  };

  return (
    <PaymentContext.Provider
      value={{
        total: state.total,
        addTotal,
        newPayment,
        addNumberOfItems,
        numberOfItems: state.numberOfItems,
      }}
      {...props}
    />
  );
}

export { PaymentContext, PaymentProvider };
