import { useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import CreateIcon from "@mui/icons-material/Create";
import Fade from "@mui/material/Fade";
import Container from "@mui/material/Container";
import CategoryTable from "../components/CategoryTable";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import CreateCategory from "../components/CreateCategory";

function Category() {
  //Modal Transition
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Modal Style
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "100px",
          }}
        >
          <div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                maxWidth: "100%",
                marginBottom: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{ flex: "1 1 100%" }}
                  variant="h5"
                  id="tableTitle"
                  component="div"
                >
                  Categories
                </Typography>
              </Box>
            </Box>

            <CategoryTable />
          </div>
        </Box>
      </Container>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: "1%",
          zIndex: "modal",
        }}
      >
        <Tooltip
          title="Create Category"
          placement="top"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
        >
          <SpeedDial
            ariaLabel="SpeedDial"
            sx={{ position: "absolute", bottom: 16, right: 20 }}
            icon={<SpeedDialIcon openIcon={<CreateIcon />} />}
            onClick={handleOpen}
          ></SpeedDial>
        </Tooltip>
      </Box>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <CreateCategory />
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}

export default Category;
