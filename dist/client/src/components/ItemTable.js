"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Table_1 = __importDefault(require("@mui/material/Table"));
const TableBody_1 = __importDefault(require("@mui/material/TableBody"));
const TableCell_1 = __importDefault(require("@mui/material/TableCell"));
const TableContainer_1 = __importDefault(require("@mui/material/TableContainer"));
const TableHead_1 = __importDefault(require("@mui/material/TableHead"));
const TableRow_1 = __importDefault(require("@mui/material/TableRow"));
const Paper_1 = __importDefault(require("@mui/material/Paper"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Grow_1 = __importDefault(require("@mui/material/Grow"));
function ItemTable({ items }) {
    function createData(_id, name, categoryName, price, sku, stock, image) {
        return { _id, name, categoryName, price, sku, stock, image };
    }
    const rows = items.map((item) => {
        return createData(item._id, item.name, item.category.categoryName, item.price, item.sku, item.stock, item.image);
    });
    return ((0, jsx_runtime_1.jsx)(Grow_1.default, Object.assign({ in: true }, { children: (0, jsx_runtime_1.jsx)(TableContainer_1.default, Object.assign({ component: Paper_1.default }, { children: (0, jsx_runtime_1.jsxs)(Table_1.default, Object.assign({ sx: { minWidth: 800 }, "aria-label": "simple table" }, { children: [(0, jsx_runtime_1.jsx)(TableHead_1.default, { children: (0, jsx_runtime_1.jsxs)(TableRow_1.default, { children: [(0, jsx_runtime_1.jsx)(TableCell_1.default, {}), (0, jsx_runtime_1.jsx)(TableCell_1.default, { children: "Product" }), (0, jsx_runtime_1.jsx)(TableCell_1.default, Object.assign({ align: "right" }, { children: "Category" })), (0, jsx_runtime_1.jsx)(TableCell_1.default, Object.assign({ align: "right" }, { children: "Price" })), (0, jsx_runtime_1.jsx)(TableCell_1.default, Object.assign({ align: "right" }, { children: "Sku" })), (0, jsx_runtime_1.jsx)(TableCell_1.default, Object.assign({ align: "right" }, { children: "Stock" })), (0, jsx_runtime_1.jsx)(TableCell_1.default, { align: "right" })] }) }), (0, jsx_runtime_1.jsx)(TableBody_1.default, { children: rows.map((row) => ((0, jsx_runtime_1.jsxs)(TableRow_1.default, Object.assign({ sx: { "&:last-child td, &:last-child th": { border: 0 } } }, { children: [(0, jsx_runtime_1.jsx)(TableCell_1.default, Object.assign({ component: "th", scope: "row" }, { children: (0, jsx_runtime_1.jsx)("img", { src: `images/${row.image}`, alt: row.name, width: "75", height: "75" }) })), (0, jsx_runtime_1.jsx)(TableCell_1.default, Object.assign({ component: "th", scope: "row" }, { children: row.name })), (0, jsx_runtime_1.jsx)(TableCell_1.default, Object.assign({ align: "right" }, { children: row.categoryName })), (0, jsx_runtime_1.jsxs)(TableCell_1.default, Object.assign({ align: "right" }, { children: [row.price, " Php"] })), (0, jsx_runtime_1.jsx)(TableCell_1.default, Object.assign({ align: "right" }, { children: row.sku })), (0, jsx_runtime_1.jsx)(TableCell_1.default, Object.assign({ align: "right" }, { children: row.stock })), (0, jsx_runtime_1.jsx)(TableCell_1.default, Object.assign({ align: "right" }, { children: (0, jsx_runtime_1.jsx)(Button_1.default, { children: "Edit" }) }))] }), row._id))) })] })) })) })));
}
exports.default = ItemTable;
