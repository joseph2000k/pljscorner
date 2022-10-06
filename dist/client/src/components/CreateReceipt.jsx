"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const paymentContext_1 = require("../context/paymentContext");
const styles_1 = require("@mui/material/styles");
const Avatar_1 = __importDefault(require("@mui/material/Avatar"));
const AccountBalanceWallet_1 = __importDefault(require("@mui/icons-material/AccountBalanceWallet"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const FormControl_1 = __importDefault(require("@mui/material/FormControl"));
const Payment_1 = __importDefault(require("@mui/icons-material/Payment"));
const cartQuery_1 = require("../graphql/query/cartQuery");
const receipt_1 = require("../graphql/mutation/receipt");
const authContext_1 = require("../context/authContext");
const hooks_1 = require("../utility/hooks");
const react_hooks_1 = require("@apollo/react-hooks");
function CreateReceipt({ setOpen, paymentMethod }) {
    const { total } = (0, react_1.useContext)(paymentContext_1.PaymentContext);
    const { user } = (0, react_1.useContext)(authContext_1.AuthContext);
    const [isPayed, setIsPayed] = (0, react_1.useState)(false);
    const [totalPrice, setTotalPrice] = (0, react_1.useState)(total);
    const theme = (0, styles_1.useTheme)();
    const { loading, error, data, refetch } = (0, react_hooks_1.useQuery)(cartQuery_1.GET_CART, {
        variables: {
            userId: user.id,
        },
    });
    function receiptCallback() {
        setTotalPrice(total);
        receipt();
        if (!receiptLoading) {
            setIsPayed(true);
        }
    }
    refetch();
    const { handleChange, handleSubmit, formData } = (0, hooks_1.useForm)(receiptCallback, {
        cash: 0,
    });
    const { cash } = formData;
    let cartItems = [];
    if (!loading && !error) {
        cartItems = data.getCart.items.map((item) => {
            return {
                itemId: item.itemId,
                item: item.item,
                quantity: item.quantity,
                price: item.price,
            };
        });
    }
    const [receipt, { loading: receiptLoading }] = (0, react_hooks_1.useMutation)(receipt_1.RECEIPT, {
        variables: {
            receiptInput: {
                total: total,
                cash: cash,
                items: cartItems,
                paymentmethod: paymentMethod.paymentMethod._id,
            },
        },
    });
    const toPay = (<>
      <Typography_1.default id="transition-modal-title" variant="h5" component="h2">
        Amount Due: ₱ {total}
      </Typography_1.default>

      <Box_1.default sx={{ display: "flex", alignItems: "center", mt: 3, mb: 2 }}>
        <Grid_1.default container spacing={2}>
          <FormControl_1.default fullWidth sx={{ m: 1 }} variant="standard">
            <TextField_1.default autoFocus required type="number" id="standard-adornment-amount" name="cash" label="Cash Amount" variant="standard" inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }} onChange={handleChange}/>
          </FormControl_1.default>
        </Grid_1.default>
      </Box_1.default>

      <Button_1.default color="secondary" variant="contained" type="submit" fullWidth disabled={receiptLoading || cash < total} onClick={handleSubmit}>
        Pay &nbsp;
        <Payment_1.default />
      </Button_1.default>
    </>);
    const payed = (<>
      <Box_1.default sx={{ display: "flex", alignItems: "center", mt: 3, mb: 2 }}>
        <Typography_1.default id="transition-modal-title" variant="h5" component="h2">
          <Box_1.default sx={{ display: "flex", alignItems: "center" }}>
            Transaction Successful!
          </Box_1.default>
          <Box_1.default sx={{
            color: theme.palette.success.main,
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
        }}>
            <h3>Change: ₱ {cash - totalPrice}</h3>
          </Box_1.default>
          <Box_1.default sx={{ display: "flex", alignItems: "center", mt: 3, mb: 2 }}>
            <Button_1.default autoFocus fullWidth color="secondary" variant="contained" onClick={(e) => {
            e.preventDefault();
            setOpen(false);
        }}>
              close
            </Button_1.default>
          </Box_1.default>
        </Typography_1.default>
      </Box_1.default>
    </>);
    return (<styles_1.ThemeProvider theme={theme}>
      <Box_1.default component="form" sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
        <Avatar_1.default sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AccountBalanceWallet_1.default />
        </Avatar_1.default>
        {isPayed ? payed : toPay}
      </Box_1.default>
    </styles_1.ThemeProvider>);
}
exports.default = CreateReceipt;
