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
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function PosCart() {
  const { user } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_CART, {
    variables: {
      userId: user.id,
    },
  });

  function createData(
    _id: string,
    itemId: string,
    item: string,
    quantity: number,
    price: number
  ) {
    return { _id, itemId, item, quantity, price };
  }

  //map through cart items and create data for table
  let cartItems = [];
  if (!loading && !error) {
    cartItems = data.getCart.items
      .map((item: any) => {
        return createData(
          item._id,
          item.itemId,
          item.item,
          item.quantity,
          item.price
        );
      })
      .reverse();
  }

  console.log(cartItems);

  const Receipt = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
      marginLeft: "10px",
      maxWidth: "150px",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "25px",
      maxWidth: "300px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "60px",
      maxWidth: "300px",
    },
  }));

  return (
    <Grid
      container
      component="main"
      sx={{
        minHeight: "75vh",
        width: "400px",
        marginTop: "10px",
      }}
    >
      <Grid item xs={false}>
        <Receipt>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "10px",
            }}
          >
            <Table sx={{ maxWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((row: any) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.item}
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Receipt>
      </Grid>
    </Grid>
  );
}
