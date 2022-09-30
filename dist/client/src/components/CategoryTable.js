"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const CategoryQuery_1 = require("../graphql/query/CategoryQuery");
const client_1 = require("@apollo/client");
const ProgressBar_1 = __importDefault(require("../components/ProgressBar"));
const Table_1 = __importDefault(require("@mui/material/Table"));
const TableBody_1 = __importDefault(require("@mui/material/TableBody"));
const TableCell_1 = __importDefault(require("@mui/material/TableCell"));
const TableContainer_1 = __importDefault(require("@mui/material/TableContainer"));
const TableHead_1 = __importDefault(require("@mui/material/TableHead"));
const TableRow_1 = __importDefault(require("@mui/material/TableRow"));
const Paper_1 = __importDefault(require("@mui/material/Paper"));
const Grow_1 = __importDefault(require("@mui/material/Grow"));
function CategoryTable() {
    const { loading, error, data } = (0, client_1.useQuery)(CategoryQuery_1.GET_CATEGORIES);
    if (loading)
        return (0, jsx_runtime_1.jsx)(ProgressBar_1.default, {});
    function createData(_id, categoryName) {
        return { _id, categoryName };
    }
    const rows = data.getCategory.map((category) => {
        return createData(category._id, category.categoryName);
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !loading && !error && ((0, jsx_runtime_1.jsx)(Grow_1.default, Object.assign({ in: true }, { children: (0, jsx_runtime_1.jsx)(TableContainer_1.default, Object.assign({ component: Paper_1.default }, { children: (0, jsx_runtime_1.jsxs)(Table_1.default, Object.assign({ sx: { minWidth: 800 }, "aria-label": "simple table" }, { children: [(0, jsx_runtime_1.jsx)(TableHead_1.default, { children: (0, jsx_runtime_1.jsx)(TableRow_1.default, { children: (0, jsx_runtime_1.jsx)(TableCell_1.default, { children: "Category Name" }) }) }), (0, jsx_runtime_1.jsx)(TableBody_1.default, { children: rows.map((row) => ((0, jsx_runtime_1.jsx)(TableRow_1.default, { children: (0, jsx_runtime_1.jsx)(TableCell_1.default, Object.assign({ component: "th", scope: "row" }, { children: row.categoryName })) }, row._id))) })] })) })) }))) }));
}
exports.default = CategoryTable;
