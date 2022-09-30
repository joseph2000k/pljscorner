import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { GET_RECEIPT } from "../graphql/query/receipt";
import { useQuery } from "@apollo/client";
import Paper from "@mui/material/Paper";
import ProgressBar from "./ProgressBar";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Moment from "moment";

export default function ViewReceipt({ receiptId: receiptId }: any) {
  const { loading, error, data } = useQuery(GET_RECEIPT, {
    variables: { receiptId: receiptId },
  });

  if (loading) {
    return (
      <Box sx={{ width: "100%", marginTop: "300px" }}>
        <LinearProgress />
      </Box>
    );
  }

  console.log(data);

  if (receiptId === "") {
    return <Box marginTop="300px">Please Select a Receipt</Box>;
  }

  const items = data.receipt.items ? (
    data.receipt.items.map((item: any) => {
      return (
        <Box
          key={item.itemId}
          sx={{
            marginTop: "5px",
            marginBottom: "5px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            {item.item} x {item.quantity}
          </Box>
          <Box>{item.price}</Box>
        </Box>
      );
    })
  ) : (
    <Box>No Items</Box>
  );

  return (
    <>
      <Grid container marginTop="50px" marginBottom="50px">
        <Paper elevation={2} sx={{ minWidth: "500px", minHeight: "400px" }}>
          <Box
            display="flex"
            minWidth="300px"
            justifyContent="center"
            marginBottom="10px"
          >
            <Box>
              <Box display="flex" justifyContent="center" marginTop="10px">
                <Typography fontWeight="bold" fontSize="30px">
                  ₱ {data.receipt.total}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center">
                Total
              </Box>
            </Box>
          </Box>
          <Divider variant="middle" />
          <Box
            display="flex"
            minWidth="300px"
            justifyContent="left"
            marginLeft="15px"
          >
            <Box marginBottom="10px" marginTop="10px">
              Cashier: {data.receipt.cashier.username}
            </Box>
          </Box>
          <Divider variant="middle" />
          <Box margin="15px">{items}</Box>
          <Divider variant="middle" />
          <Box margin="15px">Total Discount:</Box>
          <Divider variant="middle" />
          <Box margin="15px">Total: ₱{data.receipt.total}</Box>
          <Box margin="15px"> Cash: ₱{data.receipt.cash}</Box>
          <Box margin="15px">Change: ₱{data.receipt.change}</Box>
          <Box margin="15px">
            Mode of Payment: {data.receipt.paymentmethod.name}
          </Box>
          <Divider variant="middle" />
          <Box
            display="flex"
            minWidth="300px"
            justifyContent="space-between"
            margin="15px"
          >
            <Box>
              Date: &nbsp;
              {Moment(data.receipt.time).format("l, h:mm:ss a")}
            </Box>
            <Box>#{data.receipt.receiptnumber}</Box>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}
