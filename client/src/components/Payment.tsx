import { useContext, useState } from "react";
import CreateReceipt from "./CreateReceipt";
import { styled } from "@mui/material/styles";
import { PaymentContext } from "../context/paymentContext";
import { Box } from "@mui/system";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

//for Modal
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

export default function Payment() {
  const theme = useTheme();
  const { total } = useContext(PaymentContext);

  //Modal Transition
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Payment = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0px",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "5px",
      maxWidth: "44vh",
      minHeight: "15vh",
      //border: "1px solid #000",
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
    </ThemeProvider>
  );
}
