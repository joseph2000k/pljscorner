import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { GET_CART } from "../graphql/query/cartQuery";
import { useQuery } from "@apollo/react-hooks";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";

export default function PosCart() {
  const { user } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_CART, {
    variables: {
      userId: user.id,
    },
  });

  function createData(
    itemId: string,
    item: string,
    quantity: number,
    price: number
  ) {
    return { itemId, item, quantity, price };
  }

  //map through cart items and create data for table
  let cartItems = [];
  if (!loading && !error) {
    cartItems = data.getCart.items
      .map((item: any) => {
        return createData(item.itemId, item.item, item.quantity, item.price);
      })
      .reverse();
  }

  const Receipt = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
      marginLeft: "100px",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "150px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "170px",
    },
  }));

  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", width: "400px", marginTop: "10px" }}
    >
      <Grid item xs={false}>
        <Receipt>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            Receipt Here
          </Box>
        </Receipt>
      </Grid>
    </Grid>
  );
}
