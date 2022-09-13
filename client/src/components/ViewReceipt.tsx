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

  if (receiptId === "") {
    return <Box marginTop="300px">Please Select a Receipt</Box>;
  }

  console.log(data.receipt.items);

  return (
    <>
      <Grid container marginTop="50px">
        <Paper elevation={3} sx={{ minWidth: "400px", minHeight: "400px" }}>
          <Box
            display="flex"
            minWidth="300px"
            justifyContent="center"
            marginBottom="10px"
          >
            <Box>
              <Box display="flex" justifyContent="center" marginTop="10px">
                <Typography fontWeight="bold" fontSize="25px">
                  {data.receipt.total}
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
          items here
        </Paper>
      </Grid>
    </>
  );
}
