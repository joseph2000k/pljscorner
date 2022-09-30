import React from "react";
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
import { GET_CART } from "../graphql/query/cartQuery";
import { RECEIPT } from "../graphql/mutation/receipt";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";

import { useMutation, useQuery } from "@apollo/react-hooks";

export default function CreateReceiptCard({ setOpen, paymentMethod }: any) {
  const { total } = useContext(PaymentContext);
  const { user } = useContext(AuthContext);

  console.log("this is the payment method inside card", paymentMethod);

  const [isPayed, setIsPayed] = useState(false);

  const [totalPrice, setTotalPrice] = useState(total);

  const theme = useTheme();

  const { loading, error, data, refetch } = useQuery(GET_CART, {
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

  const { handleChange, handleSubmit, formData } = useForm(receiptCallback, {
    cash: 0,
  });

  const { cash }: any = formData;

  let cartItems: any = [];
  if (!loading && !error) {
    cartItems = data.getCart.items.map((item: any) => {
      return {
        itemId: item.itemId,
        item: item.item,
        quantity: item.quantity,
        price: item.price,
      };
    });
  }

  const [receipt, { loading: receiptLoading }] = useMutation(RECEIPT, {
    variables: {
      receiptInput: {
        total: total,
        cash: total,
        items: cartItems,
        paymentmethod: paymentMethod.paymentMethod._id,
      },
    },
  });

  const toPay = (
    <>
      <Typography id="transition-modal-title" variant="h5" component="h2">
        Amount Due: ₱ {total}
      </Typography>

      <Button
        color="secondary"
        variant="contained"
        type="submit"
        fullWidth
        onClick={handleSubmit}
      >
        Pay With GCash &nbsp;
        <PaymentIcon />
      </Button>
    </>
  );

  const payed = (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mt: 3, mb: 2 }}>
        <Typography id="transition-modal-title" variant="h5" component="h2">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Transaction Successful! */}
          </Box>
          <Box
            sx={{
              color: theme.palette.success.main,
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3>Transaction Successful!</h3>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 3, mb: 2 }}>
            <Button
              autoFocus
              fullWidth
              color="secondary"
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
            >
              close
            </Button>
          </Box>
        </Typography>
      </Box>
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