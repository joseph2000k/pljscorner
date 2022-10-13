"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
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
        return <ProgressBar_1.default />;
    function createData(_id, categoryName) {
        return { _id, categoryName };
    }
    const rows = data.getCategory.map((category) => {
        return createData(category._id, category.categoryName);
    });
    return (<>
      {!loading && !error && (<Grow_1.default in={true}>
          <TableContainer_1.default component={Paper_1.default}>
            <Table_1.default sx={{ minWidth: 800 }} aria-label="simple table">
              <TableHead_1.default>
                <TableRow_1.default>
                  <TableCell_1.default>Category Name</TableCell_1.default>
                </TableRow_1.default>
              </TableHead_1.default>
              <TableBody_1.default>
                {rows.map((row) => (<TableRow_1.default key={row._id}>
                    <TableCell_1.default component="th" scope="row">
                      {row.categoryName}
                    </TableCell_1.default>
                  </TableRow_1.default>))}
              </TableBody_1.default>
            </Table_1.default>
          </TableContainer_1.default>
        </Grow_1.default>)}
    </>);
}
exports.default = CategoryTable;
