import { useContext } from "react";
import { styled } from "@mui/material/styles";
import { PaymentContext } from "../context/paymentContext";

export default function Payment() {
  const { total } = useContext(PaymentContext);

  const Payment = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0px",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "130px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "150px",
    },
  }));

  return (
    <Payment>
      <h2>Total: {total}</h2>
    </Payment>
  );
}
