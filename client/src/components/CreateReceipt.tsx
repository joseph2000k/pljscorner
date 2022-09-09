import { useState, useContext } from "react";
import { PaymentContext } from "../context/paymentContext";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import PaymentIcon from "@mui/icons-material/Payment";

export default function CreateReceipt({ setOpen }: any) {
  const { total } = useContext(PaymentContext);
  const [isPayed, setIsPayed] = useState(false);

  const theme = useTheme();

  const toPay = (
    <>
      <Typography id="transition-modal-title" variant="h5" component="h2">
        Amount Due: ₱ {total}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mt: 3, mb: 2 }}>
        <Grid container spacing={2}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">
              Cash Amount
            </InputLabel>
            <Input
              autoFocus
              type="number"
              id="standard-adornment-amount"
              startAdornment={
                <InputAdornment position="start">₱</InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </Box>

      <Button
        color="secondary"
        variant="contained"
        type="submit"
        //onsubmit prevent default to prevent page refresh
        onClick={(e) => {
          e.preventDefault();
          setIsPayed(true);
        }}
      >
        Pay &nbsp;
        <PaymentIcon />
      </Button>
    </>
  );

  const payed = (
    <>
      <Typography id="transition-modal-title" variant="h5" component="h2">
        payed
        <Button
          autoFocus
          color="secondary"
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
        >
          close
        </Button>
      </Typography>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AccountBalanceWalletIcon />
        </Avatar>
        {isPayed ? payed : toPay}
      </Box>
    </ThemeProvider>
  );
}
