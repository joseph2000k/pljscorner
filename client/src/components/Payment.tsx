import React from 'react'
import { styled } from "@mui/material/styles";

export default function Payment() {

    const Payment = styled("div")(({ theme }) => ({
        [theme.breakpoints.up("sm")]: {
          marginLeft: "50px",
        },
        [theme.breakpoints.up("md")]: {
          marginLeft: "100px",
        },
        [theme.breakpoints.up("lg")]: {
          marginLeft: "140px",
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
          width: "1080px",
        },
      }));

  return (
    <Payment>
    <h3>Payment Component</h3>
    </Payment>
  )
}
