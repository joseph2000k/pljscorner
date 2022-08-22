import ProductTab from "../components/ProductTab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PosItems from "../components/PosItems";
import PosReceipt from "../components/PosReceipt";
import CssBaseline from "@mui/material/CssBaseline";

function POS() {
  return (
    <>
      <div style={{ marginTop: "60px" }}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid item xs={false} sm={8} md={7}>
            <div style={{ position: "sticky" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ProductTab />
                <PosItems />
              </Box>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={5}
            component={Paper}
            elevation={6}
            square
            style={{ maxHeight: "100vh", overflow: "auto" }}
          >
            <PosReceipt />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default POS;
