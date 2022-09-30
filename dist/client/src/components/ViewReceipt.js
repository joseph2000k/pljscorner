"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const receipt_1 = require("../graphql/query/receipt");
const client_1 = require("@apollo/client");
const Paper_1 = __importDefault(require("@mui/material/Paper"));
const LinearProgress_1 = __importDefault(require("@mui/material/LinearProgress"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Divider_1 = __importDefault(require("@mui/material/Divider"));
const moment_1 = __importDefault(require("moment"));
function ViewReceipt({ receiptId: receiptId }) {
    const { loading, error, data } = (0, client_1.useQuery)(receipt_1.GET_RECEIPT, {
        variables: { receiptId: receiptId },
    });
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: { width: "100%", marginTop: "300px" } }, { children: (0, jsx_runtime_1.jsx)(LinearProgress_1.default, {}) })));
    }
    console.log(data);
    if (receiptId === "") {
        return (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ marginTop: "300px" }, { children: "Please Select a Receipt" }));
    }
    const items = data.receipt.items ? (data.receipt.items.map((item) => {
        return ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                marginTop: "5px",
                marginBottom: "5px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            } }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, { children: [item.item, " x ", item.quantity] }), (0, jsx_runtime_1.jsx)(Box_1.default, { children: item.price })] }), item.itemId));
    })) : ((0, jsx_runtime_1.jsx)(Box_1.default, { children: "No Items" }));
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ container: true, marginTop: "50px", marginBottom: "50px" }, { children: (0, jsx_runtime_1.jsxs)(Paper_1.default, Object.assign({ elevation: 2, sx: { minWidth: "500px", minHeight: "400px" } }, { children: [(0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ display: "flex", minWidth: "300px", justifyContent: "center", marginBottom: "10px" }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, { children: [(0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ display: "flex", justifyContent: "center", marginTop: "10px" }, { children: (0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ fontWeight: "bold", fontSize: "30px" }, { children: ["\u20B1 ", data.receipt.total] })) })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ display: "flex", justifyContent: "center" }, { children: "Total" }))] }) })), (0, jsx_runtime_1.jsx)(Divider_1.default, { variant: "middle" }), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ display: "flex", minWidth: "300px", justifyContent: "left", marginLeft: "15px" }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ marginBottom: "10px", marginTop: "10px" }, { children: ["Cashier: ", data.receipt.cashier.username] })) })), (0, jsx_runtime_1.jsx)(Divider_1.default, { variant: "middle" }), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ margin: "15px" }, { children: items })), (0, jsx_runtime_1.jsx)(Divider_1.default, { variant: "middle" }), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ margin: "15px" }, { children: "Total Discount:" })), (0, jsx_runtime_1.jsx)(Divider_1.default, { variant: "middle" }), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ margin: "15px" }, { children: ["Total: \u20B1", data.receipt.total] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ margin: "15px" }, { children: [" Cash: \u20B1", data.receipt.cash] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ margin: "15px" }, { children: ["Change: \u20B1", data.receipt.change] })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ margin: "15px" }, { children: ["Mode of Payment: ", data.receipt.paymentmethod.name] })), (0, jsx_runtime_1.jsx)(Divider_1.default, { variant: "middle" }), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ display: "flex", minWidth: "300px", justifyContent: "space-between", margin: "15px" }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, { children: ["Date: \u00A0", (0, moment_1.default)(data.receipt.time).format("l, h:mm:ss a")] }), (0, jsx_runtime_1.jsxs)(Box_1.default, { children: ["#", data.receipt.receiptnumber] })] }))] })) })) }));
}
exports.default = ViewReceipt;
