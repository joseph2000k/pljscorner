"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
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
    return (<Grow_1.default in={true}>
      <TableContainer_1.default component={Paper_1.default}>
        <Table_1.default sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead_1.default>
            <TableRow_1.default>
              <TableCell_1.default></TableCell_1.default>
              <TableCell_1.default>Product</TableCell_1.default>
              <TableCell_1.default align="right">Category</TableCell_1.default>
              <TableCell_1.default align="right">Price</TableCell_1.default>
              <TableCell_1.default align="right">Sku</TableCell_1.default>
              <TableCell_1.default align="right">Stock</TableCell_1.default>
              <TableCell_1.default align="right"></TableCell_1.default>
            </TableRow_1.default>
          </TableHead_1.default>
          <TableBody_1.default>
            {rows.map((row) => (<TableRow_1.default key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell_1.default component="th" scope="row">
                  <img src={`images/${row.image}`} alt={row.name} width="75" height="75"/>
                </TableCell_1.default>
                <TableCell_1.default component="th" scope="row">
                  {row.name}
                </TableCell_1.default>
                <TableCell_1.default align="right">{row.categoryName}</TableCell_1.default>
                <TableCell_1.default align="right">{row.price} Php</TableCell_1.default>
                <TableCell_1.default align="right">{row.sku}</TableCell_1.default>
                <TableCell_1.default align="right">{row.stock}</TableCell_1.default>
                <TableCell_1.default align="right">
                  <Button_1.default>Edit</Button_1.default>
                </TableCell_1.default>
              </TableRow_1.default>))}
          </TableBody_1.default>
        </Table_1.default>
      </TableContainer_1.default>
    </Grow_1.default>);
}
exports.default = ItemTable;
