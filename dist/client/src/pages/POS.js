"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Products_1 = __importDefault(require("../components/Products"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const Paper_1 = __importDefault(require("@mui/material/Paper"));
const PosCart_1 = __importDefault(require("../components/PosCart"));
const CssBaseline_1 = __importDefault(require("@mui/material/CssBaseline"));
const styles_1 = require("@mui/material/styles");
const Payment_1 = __importDefault(require("../components/Payment"));
const paymentContext_1 = require("../context/paymentContext");
const Receipt = (0, styles_1.styled)("div")(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
        marginLeft: "210px",
    },
    [theme.breakpoints.up("md")]: {
        marginLeft: "120px",
    },
    [theme.breakpoints.up("lg")]: {
        marginLeft: "225px",
    },
}));
const Items = (0, styles_1.styled)("div")(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
        width: "550px",
    },
    [theme.breakpoints.up("md")]: {
        width: "800px",
    },
    [theme.breakpoints.up("lg")]: {
        width: "1140px",
    },
}));
function POS() {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(paymentContext_1.PaymentProvider, { children: (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ style: { marginTop: "60px" } }, { children: (0, jsx_runtime_1.jsxs)(Grid_1.default, Object.assign({ container: true, component: "main" }, { children: [(0, jsx_runtime_1.jsx)(CssBaseline_1.default, {}), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: false, sm: 5, md: 7 }, { children: (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ style: { position: "fixed" } }, { children: (0, jsx_runtime_1.jsx)(Items, { children: (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        } }, { children: (0, jsx_runtime_1.jsx)(Products_1.default, {}) })) }) })) })), (0, jsx_runtime_1.jsxs)(Receipt, { children: [(0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 12, sm: 4, md: 5, component: Paper_1.default, elevation: 2, square: true, minWidth: "50vh", style: { maxHeight: "70vh", overflow: "auto" }, position: "fixed" }, { children: (0, jsx_runtime_1.jsx)(PosCart_1.default, {}) })), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 12, sm: 4, md: 5, component: Paper_1.default, elevation: 2, square: true, minWidth: "70vh", marginTop: "70vh", style: { minHeight: "25vh" }, position: "fixed" }, { children: (0, jsx_runtime_1.jsx)(Payment_1.default, {}) }))] })] })) })) }) }));
}
exports.default = POS;
