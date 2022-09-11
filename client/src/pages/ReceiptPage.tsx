import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";


  const Items = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
      width: "450px",
    },
    [theme.breakpoints.up("md")]: {
      width: "600px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "800px",
    },
  }));

export default function ReceiptPage() {
  return (
    <Grid style={{ marginTop: "60px" }}>
          <Grid >
            <CssBaseline />
            <Grid item xs={false} sm={5} md={7}>
              <Grid style={{ position: "sticky" }}>
              <Grid
                item
                xs={12}
                sm={4}
                md={5}
                component={Paper}
                elevation={2}
                square
                minWidth="20%"
                style={{ minHeight: "100vh", overflow: "auto" }}
                position="fixed"
              >
                Receipt list
              </Grid>
              </Grid>
            </Grid>
            <Items>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    Selected Receipt
                  </Box>
                </Items>
          </Grid>
        </Grid>

  )
}
