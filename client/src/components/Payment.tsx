import { useContext, useState } from "react";
import CreateReceipt from "./CreateReceipt";
import CreateReceiptCard from "./CreateReceiptCard";
import { styled } from "@mui/material/styles";
import { PaymentContext } from "../context/paymentContext";
import { Box } from "@mui/system";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useQuery } from "@apollo/react-hooks";
import { GET_PAYMENT_METHOD } from "../graphql/query/paymentMethodQuery";

//for Modal
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

export default function Payment() {
  const theme = useTheme();
  const { total, numberOfItems } = useContext(PaymentContext);
  const [paymentMethod, setPaymentMethod] = useState("");

  const { loading, error, data } = useQuery(GET_PAYMENT_METHOD, {
    variables: {
      paymentMethod: paymentMethod,
    },
  });

  console.log(data);
  console.log(numberOfItems);

  //Modal Transition Cash

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setPaymentMethod("Cash");
  };
  const handleClose = () => setOpen(false);

  //Modal Transition Card////
  //////////////////////////////////////TODO: FIX THIS///////////////////////////////////////////
  const [openCard, setOpenCard] = useState(false);
  const handleOpenCard = () => {
    setOpenCard(true);
    setPaymentMethod("Gcash");
  };
  const handleCloseCard = () => setOpenCard(false);

  const Payment = styled("div")(({ theme }) => ({
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
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
  };

  if (loading) return <p>Loading...</p>;

  return (
    <ThemeProvider theme={theme}>
      <Payment>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            //border: "solid 1px",
            maxHeight: "8vh",
          }}
        >
          <h2>Total Price: ₱{total}</h2>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            //border: "solid 1px",
            maxHeight: "8vh",
          }}
        >
          No. Of Items: {numberOfItems}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{ maxHeight: "60px", maxWidth: "140px" }}
            onClick={handleOpen}
            {...{ disabled: total === 0 }}
          >
            Pay with Cash
            <AccountBalanceWalletIcon sx={{ marginLeft: "3px" }} />
          </Button>
          <Box sx={{ marginLeft: "50px" }}>
            <ButtonBase
              sx={{
                minHeight: "60px",
                maxWidth: "140px",
                borderRaduis: "30px",
              }}
              {...{ disabled: total === 0 }}
              onClick={handleOpenCard}
            >
              <img
                src="assets/gcashlogoblue.png"
                alt="Card Logo"
                /* width="120px"
                height="30px" */
                width="100%"
                height="60px"
              />
            </ButtonBase>
          </Box>
        </Box>
      </Payment>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <CreateReceipt setOpen={setOpen} />
            </Box>
          </Fade>
        </Modal>
      </div>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openCard}
          onClose={handleCloseCard}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openCard}>
            <Box sx={style}>
              <CreateReceiptCard setOpen={setOpenCard} />
            </Box>
          </Fade>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
