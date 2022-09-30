"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
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
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Container_1.default, { children: (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "100px",
                    } }, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    maxWidth: "100%",
                                    marginBottom: 2,
                                } }, { children: (0, jsx_runtime_1.jsx)(Box_1.default, { children: (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { flex: "1 1 100%" }, variant: "h5", id: "tableTitle", component: "div" }, { children: "Categories" })) }) })), (0, jsx_runtime_1.jsx)(CategoryTable_1.default, {})] }) })) }), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                    position: "fixed",
                    bottom: 0,
                    right: "1%",
                    zIndex: "modal",
                } }, { children: (0, jsx_runtime_1.jsx)(Tooltip_1.default, Object.assign({ title: "Create Category", placement: "top", TransitionComponent: Fade_1.default, TransitionProps: { timeout: 600 } }, { children: (0, jsx_runtime_1.jsx)(SpeedDial_1.default, { ariaLabel: "SpeedDial", sx: { position: "absolute", bottom: 16, right: 20 }, icon: (0, jsx_runtime_1.jsx)(SpeedDialIcon_1.default, { openIcon: (0, jsx_runtime_1.jsx)(Create_1.default, {}) }), onClick: handleOpen }) })) })), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", open: open, onClose: handleClose, closeAfterTransition: true, BackdropComponent: Backdrop_1.default, BackdropProps: {
                        timeout: 500,
                    } }, { children: (0, jsx_runtime_1.jsx)(Fade_1.default, Object.assign({ in: open }, { children: (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: style }, { children: (0, jsx_runtime_1.jsx)(CreateCategory_1.default, {}) })) })) })) })] }));
}
exports.default = Category;
