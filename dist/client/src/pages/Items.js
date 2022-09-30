"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const client_1 = require("@apollo/client");
const Container_1 = __importDefault(require("@mui/material/Container"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const ItemTable_1 = __importDefault(require("../components/ItemTable"));
const CreateItem_1 = __importDefault(require("../components/CreateItem"));
const InputLabel_1 = __importDefault(require("@mui/material/InputLabel"));
const MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
const FormControl_1 = __importDefault(require("@mui/material/FormControl"));
const Select_1 = __importDefault(require("@mui/material/Select"));
const CategoryQuery_1 = require("../graphql/query/CategoryQuery");
const ItemQuery_1 = require("../graphql/query/ItemQuery");
const ProgressBar_1 = __importDefault(require("../components/ProgressBar"));
//for Dial
const SpeedDial_1 = __importDefault(require("@mui/material/SpeedDial"));
const SpeedDialIcon_1 = __importDefault(require("@mui/material/SpeedDialIcon"));
const Tooltip_1 = __importDefault(require("@mui/material/Tooltip"));
const Create_1 = __importDefault(require("@mui/icons-material/Create"));
//for Modal
const Modal_1 = __importDefault(require("@mui/material/Modal"));
const Backdrop_1 = __importDefault(require("@mui/material/Backdrop"));
const Fade_1 = __importDefault(require("@mui/material/Fade"));
function Items() {
    //Modal Transition
    const [open, setOpen] = (0, react_1.useState)(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [category, setCategory] = (0, react_1.useState)("All Items");
    const { loading, error, data } = (0, client_1.useQuery)(CategoryQuery_1.GET_CATEGORIES);
    const getItems = (0, client_1.useQuery)(ItemQuery_1.GET_ALL_ITEMS);
    getItems.refetch();
    const getItemsByCategory = (0, client_1.useQuery)(ItemQuery_1.GET_ITEMS_BY_CATEGORY, {
        variables: {
            categoryId: category,
        },
    });
    let items = [];
    if (category === "All Items" && !getItems.loading && !getItems.error) {
        items = getItems.data.getItems;
    }
    else if (!getItemsByCategory.loading && !getItemsByCategory.error) {
        items = getItemsByCategory.data.getItemsByCategory;
    }
    if (loading)
        return (0, jsx_runtime_1.jsx)(ProgressBar_1.default, {});
    if (error)
        return (0, jsx_runtime_1.jsx)("p", { children: "Something Went Wrong..." });
    const handleChange = (event) => {
        setCategory(event.target.value);
    };
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
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!loading && !error && ((0, jsx_runtime_1.jsx)(Container_1.default, { children: (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "100px",
                    } }, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    maxWidth: "100%",
                                    marginBottom: 2,
                                } }, { children: [(0, jsx_runtime_1.jsx)(Box_1.default, { children: (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ sx: { flex: "1 1 100%" }, variant: "h5", id: "tableTitle", component: "div" }, { children: "Items" })) }), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: { width: 200 } }, { children: (0, jsx_runtime_1.jsxs)(FormControl_1.default, Object.assign({ fullWidth: true }, { children: [(0, jsx_runtime_1.jsx)(InputLabel_1.default, Object.assign({ id: "category-select-label" }, { children: "Categories" })), (0, jsx_runtime_1.jsxs)(Select_1.default, Object.assign({ labelId: "category-label", id: "category-select", value: category, label: "Categories", onChange: handleChange, defaultValue: "All Items" }, { children: [(0, jsx_runtime_1.jsx)(MenuItem_1.default, Object.assign({ value: "All Items" }, { children: "All Items" })), data.getCategory.map((category) => ((0, jsx_runtime_1.jsx)(MenuItem_1.default, Object.assign({ value: category._id }, { children: category.categoryName }), category._id)))] }))] })) }))] })), (0, jsx_runtime_1.jsx)(ItemTable_1.default, { items: items })] }) })) })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: {
                    position: "fixed",
                    bottom: 0,
                    right: "1%",
                    zIndex: "modal",
                } }, { children: (0, jsx_runtime_1.jsx)(Tooltip_1.default, Object.assign({ title: "Create Item", placement: "top", TransitionComponent: Fade_1.default, TransitionProps: { timeout: 600 } }, { children: (0, jsx_runtime_1.jsx)(SpeedDial_1.default, { ariaLabel: "SpeedDial", sx: { position: "absolute", bottom: 16, right: 20 }, icon: (0, jsx_runtime_1.jsx)(SpeedDialIcon_1.default, { openIcon: (0, jsx_runtime_1.jsx)(Create_1.default, {}) }), onClick: handleOpen }) })) })), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", open: open, onClose: handleClose, closeAfterTransition: true, BackdropComponent: Backdrop_1.default, BackdropProps: {
                        timeout: 500,
                    } }, { children: (0, jsx_runtime_1.jsx)(Fade_1.default, Object.assign({ in: open }, { children: (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: style }, { children: (0, jsx_runtime_1.jsx)(CreateItem_1.default, { displayedCategory: category }) })) })) })) })] }));
}
exports.default = Items;
