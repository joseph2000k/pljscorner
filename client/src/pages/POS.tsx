import React from "react";
import Products from "../components/Products";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PosCart from "../components/PosCart";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Payment from "../components/Payment";
import { PaymentProvider } from "../context/paymentContext";

const Receipt = styled("div")(({ theme }) => ({
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

const Items = styled("div")(({ theme }) => ({
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
  return (
    <>
      <PaymentProvider>
        <Grid style={{ marginTop: "60px" }}>
          <Grid container component="main">
            <CssBaseline />
            <Grid item xs={false} sm={5} md={7}>
              <Grid style={{ position: "fixed" }}>
                <Items>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Products />
                  </Box>
                </Items>
              </Grid>
            </Grid>
            <Receipt>
              <Grid
                item
                xs={12}
                sm={4}
                md={5}
                component={Paper}
                elevation={2}
                square
                minWidth="50vh"
                maxHeight= {{lg: "70vh", md: "50vh", sm: "70vh", xs: "70vh"}}
                overflow= "auto" 
                position="fixed"
              >
                <PosCart />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={5}
                component={Paper}
                elevation={2}
                square
                minWidth="70vh"
                marginTop= {{lg: "70vh", md: "50vh", sm: "70vh", xs: "70vh"}}
                minHeight= {{lg: "25vh", md: "45vh", sm: "25vh", xs: "25vh"}}
                position="fixed"
              >
                <Payment />
              </Grid>
            </Receipt>
          </Grid>
        </Grid>
      </PaymentProvider>
    </>
  );
}

export default POS;
