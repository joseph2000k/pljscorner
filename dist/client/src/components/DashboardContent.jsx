"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = require("@apollo/client");
const receipt_1 = require("../graphql/query/receipt");
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const Paper_1 = __importDefault(require("@mui/material/Paper"));
function DashboardContent({ from, to }) {
    const { loading, error, data, refetch } = (0, client_1.useQuery)(receipt_1.GET_RECEIPTS);
    if (loading) {
        return <div>Loading...</div>;
    }
    refetch();
    //select total in each receipt
    const total = data.receipts
        .filter((receipt) => {
        return new Date(receipt.time) >= from && new Date(receipt.time) <= to;
    })
        .map((receipt) => {
        return receipt.total;
    });
    console.log(total);
    //sum total
    const sum = total.reduce((a, b) => a + b, 0);
    //select total in each receipt where payment method is cash
    const cash = data.receipts
        .filter((receipt) => {
        var _a;
        const receiptDate = new Date(receipt.time);
        return (((_a = receipt.paymentmethod) === null || _a === void 0 ? void 0 : _a.name) === "Cash" &&
            receiptDate >= from &&
            receiptDate <= to);
    })
        .map((receipt) => {
        return receipt.total;
    });
    //sum cash
    const cashSum = cash.reduce((a, b) => a + b, 0);
    const card = data.receipts
        .filter((receipt) => {
        var _a;
        const receiptDate = new Date(receipt.time);
        return (((_a = receipt.paymentmethod) === null || _a === void 0 ? void 0 : _a.name) === "Gcash" &&
            receiptDate >= from &&
            receiptDate <= to);
    })
        .map((receipt) => {
        return receipt.total;
    });
    const cardSum = card.reduce((a, b) => a + b, 0);
    const cashToday = data.receipts
        .filter((receipt) => {
        var _a;
        return ((_a = receipt.paymentmethod) === null || _a === void 0 ? void 0 : _a.name) === "Cash" &&
            new Date(receipt.time).getDate() === new Date().getDate();
    })
        .map((receipt) => {
        return receipt.total;
    });
    const cashSumToday = cashToday.reduce((a, b) => a + b, 0);
    const cardToday = data.receipts
        .filter((receipt) => {
        var _a;
        return ((_a = receipt.paymentmethod) === null || _a === void 0 ? void 0 : _a.name) === "Gcash" &&
            new Date(receipt.time).getDate() === new Date().getDate();
    })
        .map((receipt) => {
        return receipt.total;
    });
    const cardSumToday = cardToday.reduce((a, b) => a + b, 0);
    return (<Grid_1.default style={{ marginTop: "100px" }}>
      <Grid_1.default container item xs={12} style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
        <Paper_1.default elevation={2} sx={{
            minWidth: "300px",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
          <h1>Total Sales</h1>
          <h2>{sum}</h2>
        </Paper_1.default>

        <Paper_1.default elevation={2} sx={{
            minWidth: "300px",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "20px",
        }}>
          <h1>Total Cash Sales</h1>
          <h2>{cashSum}</h2>
        </Paper_1.default>

        <Paper_1.default elevation={2} sx={{
            minWidth: "300px",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "20px",
        }}>
          <h1>Total GCash Sales</h1>
          <h2>{cardSum}</h2>
        </Paper_1.default>
      </Grid_1.default>
    </Grid_1.default>);
}
exports.default = DashboardContent;
