import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { GET_RECEIPT } from "../graphql/query/receipt";
import { useQuery } from "@apollo/client";
import Paper from "@mui/material/Paper";
import ProgressBar from "./ProgressBar";
import LinearProgress from "@mui/material/LinearProgress";

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

  return (
    <>
      <Grid container marginTop="50px">
        <Paper elevation={3}>
          <Box>cash: {data.receipt.cash}</Box>
        </Paper>
      </Grid>
    </>
  );
}
