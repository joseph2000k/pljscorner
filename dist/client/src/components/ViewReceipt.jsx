"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
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
        return (<Box_1.default sx={{ width: "100%", marginTop: "300px" }}>
        <LinearProgress_1.default />
      </Box_1.default>);
    }
    if (receiptId === "") {
        return <Box_1.default marginTop="300px">Please Select a Receipt</Box_1.default>;
    }
    const items = data.receipt.items ? (data.receipt.items.map((item) => {
        return (<Box_1.default key={item.itemId} sx={{
                marginTop: "5px",
                marginBottom: "5px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}>
          <Box_1.default>
            {item.item} x {item.quantity}
          </Box_1.default>
          <Box_1.default>{item.price}</Box_1.default>
        </Box_1.default>);
    })) : (<Box_1.default>No Items</Box_1.default>);
    return (<>
      <Grid_1.default container marginTop="50px" marginBottom="50px">
        <Paper_1.default elevation={2} sx={{ minWidth: "500px", minHeight: "400px" }}>
          <Box_1.default display="flex" minWidth="300px" justifyContent="center" marginBottom="10px">
            <Box_1.default>
              <Box_1.default display="flex" justifyContent="center" marginTop="10px">
                <Typography_1.default fontWeight="bold" fontSize="30px">
                  ₱ {data.receipt.total}
                </Typography_1.default>
              </Box_1.default>
              <Box_1.default display="flex" justifyContent="center">
                Total
              </Box_1.default>
            </Box_1.default>
          </Box_1.default>
          <Divider_1.default variant="middle"/>
          <Box_1.default display="flex" minWidth="300px" justifyContent="left" marginLeft="15px">
            <Box_1.default marginBottom="10px" marginTop="10px">
              Cashier: {data.receipt.cashier.username}
            </Box_1.default>
          </Box_1.default>
          <Divider_1.default variant="middle"/>
          <Box_1.default margin="15px">{items}</Box_1.default>
          <Divider_1.default variant="middle"/>
          <Box_1.default margin="15px">Total Discount:</Box_1.default>
          <Divider_1.default variant="middle"/>
          <Box_1.default margin="15px">Total: ₱{data.receipt.total}</Box_1.default>
          <Box_1.default margin="15px"> Cash: ₱{data.receipt.cash}</Box_1.default>
          <Box_1.default margin="15px">Change: ₱{data.receipt.change}</Box_1.default>
          <Box_1.default margin="15px">
            Mode of Payment: {data.receipt.paymentmethod.name}
          </Box_1.default>
          <Divider_1.default variant="middle"/>
          <Box_1.default display="flex" minWidth="300px" justifyContent="space-between" margin="15px">
            <Box_1.default>
              Date: &nbsp;
              {(0, moment_1.default)(data.receipt.time).format("l, h:mm:ss a")}
            </Box_1.default>
            <Box_1.default>#{data.receipt.receiptnumber}</Box_1.default>
          </Box_1.default>
        </Paper_1.default>
      </Grid_1.default>
    </>);
}
exports.default = ViewReceipt;
