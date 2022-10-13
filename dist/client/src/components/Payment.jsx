"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const CreateReceipt_1 = __importDefault(require("./CreateReceipt"));
const CreateReceiptCard_1 = __importDefault(require("./CreateReceiptCard"));
const styles_1 = require("@mui/material/styles");
const paymentContext_1 = require("../context/paymentContext");
const system_1 = require("@mui/system");
const styles_2 = require("@mui/material/styles");
const Button_1 = __importDefault(require("@mui/material/Button"));
const ButtonBase_1 = __importDefault(require("@mui/material/ButtonBase"));
const AccountBalanceWallet_1 = __importDefault(require("@mui/icons-material/AccountBalanceWallet"));
const react_hooks_1 = require("@apollo/react-hooks");
const paymentMethodQuery_1 = require("../graphql/query/paymentMethodQuery");
//for Modal
const Modal_1 = __importDefault(require("@mui/material/Modal"));
const Backdrop_1 = __importDefault(require("@mui/material/Backdrop"));
const Fade_1 = __importDefault(require("@mui/material/Fade"));
function Payment() {
    const theme = (0, styles_2.useTheme)();
    const { total, numberOfItems } = (0, react_2.useContext)(paymentContext_1.PaymentContext);
    const [paymentMethod, setPaymentMethod] = (0, react_2.useState)("");
    const { loading, error, data } = (0, react_hooks_1.useQuery)(paymentMethodQuery_1.GET_PAYMENT_METHOD, {
        variables: {
            paymentMethod: paymentMethod,
        },
    });
    console.log(data);
    console.log(numberOfItems);
    //Modal Transition Cash
    const [open, setOpen] = (0, react_2.useState)(false);
    const handleOpen = () => {
        setOpen(true);
        setPaymentMethod("Cash");
    };
    const handleClose = () => setOpen(false);
    //Modal Transition Card////
    //////////////////////////////////////TODO: FIX THIS///////////////////////////////////////////
    const [openCard, setOpenCard] = (0, react_2.useState)(false);
    const handleOpenCard = () => {
        setOpenCard(true);
        setPaymentMethod("Gcash");
    };
    const handleCloseCard = () => setOpenCard(false);
    const Payment = (0, styles_1.styled)("div")(({ theme }) => ({
        [theme.breakpoints.up("sm")]: {
            marginLeft: "0px",
            maxWidth: "22vh",
        },
        [theme.breakpoints.up("md")]: {
            marginLeft: "5px",
            maxWidth: "44vh",
            minHeight: "15vh",
        },
        [theme.breakpoints.up("lg")]: {
            marginLeft: "10px",
            maxWidth: "60vh",
            minHeight: "15vh",
            //border: "1px solid #e0e0e0",
        },
    }));
    //Modal Style
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        borderRadius: 1,
        boxShadow: 24,
        p: 4,
    };
    if (loading)
        return <p>Loading...</p>;
    return (<styles_2.ThemeProvider theme={theme}>
      <Payment>
        <system_1.Box sx={{
            display: "flex",
            justifyContent: "center",
            //border: "solid 1px",
            maxHeight: "8vh",
        }}>
          <h2>Total Price: ₱{total}</h2>
        </system_1.Box>
        <system_1.Box sx={{
            display: "flex",
            justifyContent: "center",
            //border: "solid 1px",
            maxHeight: "8vh",
        }}>
          No. Of Items: {numberOfItems}
        </system_1.Box>
        <system_1.Box sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            marginBottom: "10px",
        }}>
          <Button_1.default variant="contained" color="secondary" sx={{ maxHeight: "60px", maxWidth: "140px" }} onClick={handleOpen} {...{ disabled: total === 0 }}>
            Pay with Cash
            <AccountBalanceWallet_1.default sx={{ marginLeft: "3px" }}/>
          </Button_1.default>
          <system_1.Box sx={{ marginLeft: "50px" }}>
            <ButtonBase_1.default sx={{
            minHeight: "60px",
            maxWidth: "140px",
            borderRaduis: "30px",
        }} {...{ disabled: total === 0 }} onClick={handleOpenCard}>
              <img src="assets/gcashlogoblue.png" alt="Card Logo" 
    /* width="120px"
    height="30px" */
    width="100%" height="60px"/>
            </ButtonBase_1.default>
          </system_1.Box>
        </system_1.Box>
      </Payment>

      <div>
        <Modal_1.default aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop_1.default} BackdropProps={{
            timeout: 500,
        }}>
          <Fade_1.default in={open}>
            <system_1.Box sx={style}>
              <CreateReceipt_1.default setOpen={setOpen} paymentMethod={data}/>
            </system_1.Box>
          </Fade_1.default>
        </Modal_1.default>
      </div>

      <div>
        <Modal_1.default aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={openCard} onClose={handleCloseCard} closeAfterTransition BackdropComponent={Backdrop_1.default} BackdropProps={{
            timeout: 500,
        }}>
          <Fade_1.default in={openCard}>
            <system_1.Box sx={style}>
              <CreateReceiptCard_1.default setOpen={setOpenCard} paymentMethod={data}/>
            </system_1.Box>
          </Fade_1.default>
        </Modal_1.default>
      </div>
    </styles_2.ThemeProvider>);
}
exports.default = Payment;
