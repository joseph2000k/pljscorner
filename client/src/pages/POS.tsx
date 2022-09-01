import Products from "../components/Products";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PosCart from "../components/PosCart";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";

const Receipt = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    marginLeft: "210px",
  },
  [theme.breakpoints.up("md")]: {
    marginLeft: "120px",
  },
  [theme.breakpoints.up("lg")]: {
    marginLeft: "215px",
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

function POS() {
  return (
    <>
      <Grid style={{ marginTop: "60px" }}>
        <Grid container component="main">
          <CssBaseline />
          <Grid item xs={false} sm={5} md={7}>
            <Grid style={{ position: "sticky" }}>
              <Items>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Products />
                </Box>
              </Items>
            </Grid>
          </Grid>
          <Receipt>
            <Grid
              item
              xs={12}
              sm={4}
              md={5}
              component={Paper}
              elevation={6}
              square
              maxWidth="800"
              style={{ maxHeight: "100vh", overflow: "auto" }}
              position="fixed"
            >
              <PosCart />
            </Grid>
          </Receipt>
        </Grid>
      </Grid>
    </>
  );
}

export default POS;
