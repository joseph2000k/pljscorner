import { useState } from "react";
import ViewReceipt from "../components/ViewReceipt";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import { useQuery } from "@apollo/client";
import { GET_RECEIPTS } from "../graphql/query/receipt";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Moment from "moment";

const Items = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: "450px",
    marginLeft: "325px",
  },
  [theme.breakpoints.up("md")]: {
    width: "600px",
    marginLeft: "450px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "800px",
    marginLeft: "450px",
  },
}));

export default function ReceiptPage() {
  const [receiptId, setReceiptId] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_RECEIPTS);

  refetch();

  if (loading) return <p>Loading...</p>;

  const handleClick = (id: string) => {
    setReceiptId(id);
  };

  const receiptList = data.receipts.map((receipt: any) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} margin={0} key={receipt._id}>
        <ButtonBase onClick={() => handleClick(receipt._id)}>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "10px",
              }}
            >
              <Box
                sx={{
                  minWidth: "270px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Box
                  sx={{
                    margin: "10px",
                  }}
                >
                  <Box sx={{ marginTop: "20px" }}>
                    <ReceiptLongIcon />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "right",
                      minWidth: "220px",
                    }}
                  >
                    #{receipt.receiptnumber}
                  </Box>
                  <Box>
                    <Typography variant="h6" margin="10px">
                      ₱ {receipt.total}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      {Moment(receipt.time).format("MMMM Do YYYY, h:mm:ss a")}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </ButtonBase>
        <Divider light />
      </Grid>
    );
  });

  return (
    <Grid style={{ marginTop: "60px" }}>
      <Grid>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={4}
          md={5}
          component={Paper}
          elevation={2}
          square
          minWidth="20%"
          style={{ maxHeight: "100vh", minHeight: "100vh", overflow: "auto" }}
          position="fixed"
        >
          <Box marginBottom="60px" marginTop="10px">
            {receiptList}
          </Box>
        </Grid>
        <Items>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ViewReceipt receiptId={receiptId} />
          </Box>
        </Items>
      </Grid>
    </Grid>
  );
}
