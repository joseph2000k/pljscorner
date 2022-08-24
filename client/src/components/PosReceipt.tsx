import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box"; 
import { styled } from '@mui/material/styles';

export default function PosReceipt() {

  const Receipt = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      marginLeft: "100px",
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: "150px",
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: "170px",
    },
  }));
  
  return (
    <Grid container component="main" sx={{ height: "100vh", width: "400px", marginTop: '10px'}}>
      <Grid item xs={false} >
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
