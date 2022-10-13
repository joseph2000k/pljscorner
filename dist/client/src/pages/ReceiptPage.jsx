"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
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
    const [receiptId, setReceiptId] = (0, react_2.useState)("");
    const { loading, error, data, refetch } = (0, client_1.useQuery)(receipt_1.GET_RECEIPTS);
    refetch();
    if (loading)
        return <p>Loading...</p>;
    const handleClick = (id) => {
        setReceiptId(id);
    };
    const receiptList = data.receipts.map((receipt) => {
        return (<Grid_1.default item xs={12} sm={6} md={4} lg={3} margin={0} key={receipt._id}>
        <ButtonBase_1.default onClick={() => handleClick(receipt._id)}>
          <Box_1.default>
            <Box_1.default sx={{
                display: "flex",
                flexDirection: "column",
                margin: "10px",
            }}>
              <Box_1.default sx={{
                minWidth: "270px",
                display: "flex",
                flexDirection: "row",
            }}>
                <Box_1.default sx={{
                margin: "10px",
            }}>
                  <Box_1.default sx={{ marginTop: "20px" }}>
                    <ReceiptLong_1.default />
                  </Box_1.default>
                </Box_1.default>
                <Box_1.default sx={{ display: "flex", flexDirection: "column" }}>
                  <Box_1.default sx={{
                display: "flex",
                justifyContent: "right",
                minWidth: "220px",
            }}>
                    #{receipt.receiptnumber}
                  </Box_1.default>
                  <Box_1.default>
                    <Typography_1.default variant="h6" margin="10px">
                      ₱ {receipt.total}
                    </Typography_1.default>
                  </Box_1.default>
                  <Box_1.default>
                    <Typography_1.default variant="body2">
                      {(0, moment_1.default)(receipt.time).format("MMMM Do YYYY, h:mm:ss a")}
                    </Typography_1.default>
                  </Box_1.default>
                </Box_1.default>
              </Box_1.default>
            </Box_1.default>
          </Box_1.default>
        </ButtonBase_1.default>
        <Divider_1.default light/>
      </Grid_1.default>);
    });
    return (<Grid_1.default style={{ marginTop: "60px" }}>
      <Grid_1.default>
        <CssBaseline_1.default />
        <Grid_1.default item xs={12} sm={4} md={5} component={Paper_1.default} elevation={2} square minWidth="20%" style={{ maxHeight: "100vh", minHeight: "100vh", overflow: "auto" }} position="fixed">
          <Box_1.default marginBottom="60px" marginTop="10px">
            {receiptList}
          </Box_1.default>
        </Grid_1.default>
        <Items>
          <Box_1.default sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <ViewReceipt_1.default receiptId={receiptId}/>
          </Box_1.default>
        </Items>
      </Grid_1.default>
    </Grid_1.default>);
}
exports.default = ReceiptPage;
