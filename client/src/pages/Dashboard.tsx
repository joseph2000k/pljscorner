import React from "react";
import { useQuery } from "@apollo/client";
import { GET_RECEIPTS } from "../graphql/query/receipt";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function Dashboard() {
  const { loading, error, data, refetch } = useQuery(GET_RECEIPTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  refetch();

  //select total in each receipt
  const total = data.receipts.map((receipt: any) => {
    return receipt.total;
  });

  //sum total
  const sum = total.reduce((a: any, b: any) => a + b, 0);

  //select total in each receipt where payment method is cash
  const cash = data.receipts
    .filter((receipt: any) => receipt.paymentmethod.name === "Cash")
    .map((receipt: any) => {
      return receipt.total;
    });

  //sum cash
  const cashSum = cash.reduce((a: any, b: any) => a + b, 0);

  const card = data.receipts
    .filter((receipt: any) => receipt.paymentmethod.name === "Gcash")
    .map((receipt: any) => {
      return receipt.total;
    });

  const cardSum = card.reduce((a: any, b: any) => a + b, 0);

  return (
    <Grid style={{ marginTop: "100px" }}>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            minWidth: "300px",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Total Sales</h1>
          <h2>{sum}</h2>
        </Paper>

        <Paper
          elevation={2}
          sx={{
            minWidth: "300px",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          <h1>Total Cash Sales</h1>
          <h2>{cashSum}</h2>
        </Paper>

        <Paper
          elevation={2}
          sx={{
            minWidth: "300px",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          <h1>Total GCash Sales</h1>
          <h2>{cardSum}</h2>
        </Paper>
      </Grid>
    </Grid>
  );
}
