"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
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
    return (<>
      <paymentContext_1.PaymentProvider>
        <Grid_1.default style={{ marginTop: "60px" }}>
          <Grid_1.default container component="main">
            <CssBaseline_1.default />
            <Grid_1.default item xs={false} sm={5} md={7}>
              <Grid_1.default style={{ position: "fixed" }}>
                <Items>
                  <Box_1.default sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
                    <Products_1.default />
                  </Box_1.default>
                </Items>
              </Grid_1.default>
            </Grid_1.default>
            <Receipt>
              <Grid_1.default item xs={12} sm={4} md={5} component={Paper_1.default} elevation={2} square minWidth="50vh" style={{ maxHeight: "70vh", overflow: "auto" }} position="fixed">
                <PosCart_1.default />
              </Grid_1.default>
              <Grid_1.default item xs={12} sm={4} md={5} component={Paper_1.default} elevation={2} square minWidth="70vh" marginTop="70vh" style={{ minHeight: "25vh" }} position="fixed">
                <Payment_1.default />
              </Grid_1.default>
            </Receipt>
          </Grid_1.default>
        </Grid_1.default>
      </paymentContext_1.PaymentProvider>
    </>);
}
exports.default = POS;
