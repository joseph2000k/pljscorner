"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ViewReceipt_1 = __importDefault(require("../components/ViewReceipt"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const styles_1 = require("@mui/material/styles");
const Paper_1 = __importDefault(require("@mui/material/Paper"));
const CssBaseline_1 = __importDefault(require("@mui/material/CssBaseline"));
const client_1 = require("@apollo/client");
const receipt_1 = require("../graphql/query/receipt");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const ButtonBase_1 = __importDefault(require("@mui/material/ButtonBase"));
const Divider_1 = __importDefault(require("@mui/material/Divider"));
const ReceiptLong_1 = __importDefault(require("@mui/icons-material/ReceiptLong"));
const moment_1 = __importDefault(require("moment"));
const Items = (0, styles_1.styled)("div")(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
        width: "450px",
        marginLeft: "300px",
    },
    [theme.breakpoints.up("md")]: {
        width: "600px",
        marginLeft: "450px",
    },
    [theme.breakpoints.up("lg")]: {
        width: "600px",
        marginLeft: "600px",
    },
}));
function ReceiptPage() {
    const [receiptId, setReceiptId] = (0, react_1.useState)("");
    const { loading, error, data, refetch } = (0, client_1.useQuery)(receipt_1.GET_RECEIPTS);
    refetch();
    if (loading)
        return (0, jsx_runtime_1.jsx)("p", { children: "Loading..." });
    const handleClick = (id) => {
        setReceiptId(id);
    };
    const receiptList = data.receipts.map((receipt) => {
        return ((0, jsx_runtime_1.jsxs)(Grid_1.default, Object.assign({ item: true, xs: 12, sm: 6, md: 4, lg: 3, margin: 0 }, { children: [(0, jsx_runtime_1.jsx)(ButtonBase_1.default, Object.assign({ onClick: () => handleClick(receipt._id) }, { children: (0, jsx_runtime_1.jsx)(Box_1.default, { children: (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                display: "flex",
                                flexDirection: "column",
                                margin: "10px",
                            } }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                    minWidth: "270px",
                                    display: "flex",
                                    flexDirection: "row",
                                } }, { children: [(0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                            margin: "10px",
                                        } }, { children: (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: { marginTop: "20px" } }, { children: (0, jsx_runtime_1.jsx)(ReceiptLong_1.default, {}) })) })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: { display: "flex", flexDirection: "column" } }, { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                                    display: "flex",
                                                    justifyContent: "right",
                                                    minWidth: "220px",
                                                } }, { children: ["#", receipt.receiptnumber] })), (0, jsx_runtime_1.jsx)(Box_1.default, { children: (0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ variant: "h6", margin: "10px" }, { children: ["\u20B1 ", receipt.total] })) }), (0, jsx_runtime_1.jsx)(Box_1.default, { children: (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "body2" }, { children: (0, moment_1.default)(receipt.time).format("MMMM Do YYYY, h:mm:ss a") })) })] }))] })) })) }) })), (0, jsx_runtime_1.jsx)(Divider_1.default, { light: true })] }), receipt._id));
    });
    return ((0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ style: { marginTop: "60px" } }, { children: (0, jsx_runtime_1.jsxs)(Grid_1.default, { children: [(0, jsx_runtime_1.jsx)(CssBaseline_1.default, {}), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 12, sm: 4, md: 5, component: Paper_1.default, elevation: 2, square: true, minWidth: "20%", style: { maxHeight: "100vh", minHeight: "100vh", overflow: "auto" }, position: "fixed" }, { children: (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ marginBottom: "60px", marginTop: "10px" }, { children: receiptList })) })), (0, jsx_runtime_1.jsx)(Items, { children: (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        } }, { children: (0, jsx_runtime_1.jsx)(ViewReceipt_1.default, { receiptId: receiptId }) })) })] }) })));
}
exports.default = ReceiptPage;
