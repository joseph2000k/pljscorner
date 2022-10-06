"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentProvider = exports.PaymentContext = void 0;
const react_1 = require("react");
const initialState = {
    total: 0,
    numberOfItems: 0,
};
const PaymentContext = (0, react_1.createContext)({
    total: 0,
    numberOfItems: 0,
    addTotal: () => { },
    addNumberOfItems: () => { },
    newPayment: () => { },
});
exports.PaymentContext = PaymentContext;
function paymentReducer(state, action) {
    switch (action.type) {
        case "ADD_TOTAL":
            return Object.assign(Object.assign({}, state), { total: action.payload });
        case "NEW_PAYMENT":
            return Object.assign(Object.assign({}, state), { total: 0 });
        case "ADD_NUMBER_OF_ITEMS":
            return Object.assign(Object.assign({}, state), { numberOfItems: action.payload });
        default:
            return state;
    }
}
function PaymentProvider(props) {
    const [state, dispatch] = (0, react_1.useReducer)(paymentReducer, initialState);
    const addTotal = (paymentData) => {
        dispatch({
            type: "ADD_TOTAL",
            payload: paymentData,
        });
    };
    const addNumberOfItems = (numberOfItemsData) => {
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
    return (<PaymentContext.Provider value={{
            total: state.total,
            addTotal,
            newPayment,
            addNumberOfItems,
            numberOfItems: state.numberOfItems,
        }} {...props}/>);
}
exports.PaymentProvider = PaymentProvider;
