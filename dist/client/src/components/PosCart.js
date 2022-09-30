"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const authContext_1 = require("../context/authContext");
const cartQuery_1 = require("../graphql/query/cartQuery");
const react_hooks_1 = require("@apollo/react-hooks");
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const styles_1 = require("@mui/material/styles");
const Table_1 = __importDefault(require("@mui/material/Table"));
const TableBody_1 = __importDefault(require("@mui/material/TableBody"));
const TableCell_1 = __importDefault(require("@mui/material/TableCell"));
const TableHead_1 = __importDefault(require("@mui/material/TableHead"));
const TableRow_1 = __importDefault(require("@mui/material/TableRow"));
function PosCart() {
    const { user } = (0, react_1.useContext)(authContext_1.AuthContext);
    const { loading, error, data } = (0, react_hooks_1.useQuery)(cartQuery_1.GET_CART, {
        variables: {
            userId: user.id,
        },
    });
    function createData(_id, itemId, item, quantity, price) {
        return { _id, itemId, item, quantity, price };
    }
    //map through cart items and create data for table
    let cartItems = [];
    if (!loading && !error) {
        cartItems = data.getCart.items
            .map((item) => {
            return createData(item._id, item.itemId, item.item, item.quantity, item.price);
        })
            .reverse();
    }
    console.log(cartItems);
    const Receipt = (0, styles_1.styled)("div")(({ theme }) => ({
        [theme.breakpoints.up("sm")]: {
            marginLeft: "10px",
            maxWidth: "150px",
        },
        [theme.breakpoints.up("md")]: {
            marginLeft: "25px",
            maxWidth: "300px",
        },
        [theme.breakpoints.up("lg")]: {
            marginLeft: "60px",
            maxWidth: "300px",
        },
    }));
    return ((0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ container: true, component: "main", sx: {
            minHeight: "75vh",
            width: "400px",
            marginTop: "10px",
        } }, { children: (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: false }, { children: (0, jsx_runtime_1.jsx)(Receipt, { children: (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "10px",
                    } }, { children: (0, jsx_runtime_1.jsxs)(Table_1.default, Object.assign({ sx: { maxWidth: 300 }, "aria-label": "simple table" }, { children: [(0, jsx_runtime_1.jsx)(TableHead_1.default, { children: (0, jsx_runtime_1.jsxs)(TableRow_1.default, { children: [(0, jsx_runtime_1.jsx)(TableCell_1.default, { children: "Item" }), (0, jsx_runtime_1.jsx)(TableCell_1.default, Object.assign({ align: "right" }, { children: "Quantity" })), (0, jsx_runtime_1.jsx)(TableCell_1.default, Object.assign({ align: "right" }, { children: "Price" }))] }) }), (0, jsx_runtime_1.jsx)(TableBody_1.default, { children: cartItems.map((row) => ((0, jsx_runtime_1.jsxs)(TableRow_1.default, Object.assign({ sx: { "&:last-child td, &:last-child th": { border: 0 } } }, { children: [(0, jsx_runtime_1.jsx)(TableCell_1.default, Object.assign({ component: "th", scope: "row" }, { children: row.item })), (0, jsx_runtime_1.jsx)(TableCell_1.default, Object.assign({ align: "right" }, { children: row.quantity })), (0, jsx_runtime_1.jsx)(TableCell_1.default, Object.assign({ align: "right" }, { children: row.price }))] }), row._id))) })] })) })) }) })) })));
}
exports.default = PosCart;
