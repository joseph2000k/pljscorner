"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Box_1 = __importDefault(require("@mui/material/Box"));
const Tooltip_1 = __importDefault(require("@mui/material/Tooltip"));
const SpeedDial_1 = __importDefault(require("@mui/material/SpeedDial"));
const SpeedDialIcon_1 = __importDefault(require("@mui/material/SpeedDialIcon"));
const Create_1 = __importDefault(require("@mui/icons-material/Create"));
const Fade_1 = __importDefault(require("@mui/material/Fade"));
const Container_1 = __importDefault(require("@mui/material/Container"));
const CategoryTable_1 = __importDefault(require("../components/CategoryTable"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Modal_1 = __importDefault(require("@mui/material/Modal"));
const Backdrop_1 = __importDefault(require("@mui/material/Backdrop"));
const CreateCategory_1 = __importDefault(require("../components/CreateCategory"));
function Category() {
    //Modal Transition
    const [open, setOpen] = (0, react_1.useState)(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //Modal Style
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        borderRadius: 1,
        boxShadow: 24,
        p: 4,
    };
    return (<>
      <Container_1.default>
        <Box_1.default sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "100px",
        }}>
          <div>
            <Box_1.default sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "100%",
            marginBottom: 2,
        }}>
              <Box_1.default>
                <Typography_1.default sx={{ flex: "1 1 100%" }} variant="h5" id="tableTitle" component="div">
                  Categories
                </Typography_1.default>
              </Box_1.default>
            </Box_1.default>

            <CategoryTable_1.default />
          </div>
        </Box_1.default>
      </Container_1.default>

      <Box_1.default sx={{
            position: "fixed",
            bottom: 0,
            right: "1%",
            zIndex: "modal",
        }}>
        <Tooltip_1.default title="Create Category" placement="top" TransitionComponent={Fade_1.default} TransitionProps={{ timeout: 600 }}>
          <SpeedDial_1.default ariaLabel="SpeedDial" sx={{ position: "absolute", bottom: 16, right: 20 }} icon={<SpeedDialIcon_1.default openIcon={<Create_1.default />}/>} onClick={handleOpen}></SpeedDial_1.default>
        </Tooltip_1.default>
      </Box_1.default>
      <div>
        <Modal_1.default aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop_1.default} BackdropProps={{
            timeout: 500,
        }}>
          <Fade_1.default in={open}>
            <Box_1.default sx={style}>
              <CreateCategory_1.default />
            </Box_1.default>
          </Fade_1.default>
        </Modal_1.default>
      </div>
    </>);
}
exports.default = Category;
