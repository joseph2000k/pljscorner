import { useState } from "react";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function CreateReceipt({ setOpen }: any) {
  const [isPayed, setIsPayed] = useState(false);

  const theme = useTheme();

  const toPay = (
    <>
      <Typography id="transition-modal-title" variant="h5" component="h2">
        Amount Due: ₱ 0.00
      </Typography>
      <button
        type="submit"
        //onsubmit prevent default to prevent page refresh
        onClick={(e) => {
          e.preventDefault();
          setIsPayed(true);
        }}
      >
        Pay
      </button>
    </>
  );

  const payed = (
    <>
      <Typography id="transition-modal-title" variant="h5" component="h2">
        payed
        <button
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
        >
          close
        </button>
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
