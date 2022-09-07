import { useContext } from "react";
import { styled } from "@mui/material/styles";
import { PaymentContext } from "../context/paymentContext";
import { Box } from "@mui/system";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export default function Payment() {
  const theme = useTheme();
  const { total } = useContext(PaymentContext);

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
          <h2>Total Price: {total}</h2>
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
            {...{ disabled: total === 0 }}
          >
            Pay with Cash
            <AccountBalanceWalletIcon sx={{ marginLeft: "3px" }} />
          </Button>
          <Box sx={{ marginLeft: "50px" }}>
            <ButtonBase
              sx={{ minHeight: "60px", maxWidth: "140px" }}
              {...{ disabled: total === 0 }}
            >
              <img
                src="assets/gcashlogo.png"
                alt="Card Logo"
                width="120px"
                height="30px"
              />
            </ButtonBase>
          </Box>
        </Box>
      </Payment>
    </ThemeProvider>
  );
}
