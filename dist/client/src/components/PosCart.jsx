"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
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
    const { user } = (0, react_2.useContext)(authContext_1.AuthContext);
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
    return (<Grid_1.default container component="main" sx={{
            minHeight: "75vh",
            width: "400px",
            marginTop: "10px",
        }}>
      <Grid_1.default item xs={false}>
        <Receipt>
          <Box_1.default sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "10px",
        }}>
            <Table_1.default sx={{ maxWidth: 300 }} aria-label="simple table">
              <TableHead_1.default>
                <TableRow_1.default>
                  <TableCell_1.default>Item</TableCell_1.default>
                  <TableCell_1.default align="right">Quantity</TableCell_1.default>
                  <TableCell_1.default align="right">Price</TableCell_1.default>
                </TableRow_1.default>
              </TableHead_1.default>
              <TableBody_1.default>
                {cartItems.map((row) => (<TableRow_1.default key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell_1.default component="th" scope="row">
                      {row.item}
                    </TableCell_1.default>
                    <TableCell_1.default align="right">{row.quantity}</TableCell_1.default>
                    <TableCell_1.default align="right">{row.price}</TableCell_1.default>
                  </TableRow_1.default>))}
              </TableBody_1.default>
            </Table_1.default>
          </Box_1.default>
        </Receipt>
      </Grid_1.default>
    </Grid_1.default>);
}
exports.default = PosCart;
