"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Drawer_1 = __importDefault(require("@mui/material/Drawer"));
const List_1 = __importDefault(require("@mui/material/List"));
const Divider_1 = __importDefault(require("@mui/material/Divider"));
const ListItem_1 = __importDefault(require("@mui/material/ListItem"));
const ListItemButton_1 = __importDefault(require("@mui/material/ListItemButton"));
const ListItemIcon_1 = __importDefault(require("@mui/material/ListItemIcon"));
const ListItemText_1 = __importDefault(require("@mui/material/ListItemText"));
const MoveToInbox_1 = __importDefault(require("@mui/icons-material/MoveToInbox"));
const Mail_1 = __importDefault(require("@mui/icons-material/Mail"));
const Menu_1 = __importDefault(require("@mui/icons-material/Menu"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const react_router_dom_1 = require("react-router-dom");
const PointOfSale_1 = __importDefault(require("@mui/icons-material/PointOfSale"));
const Category_1 = __importDefault(require("@mui/icons-material/Category"));
const FormatListBulleted_1 = __importDefault(require("@mui/icons-material/FormatListBulleted"));
function LeftDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === "keydown" &&
            (event.key === "Tab" ||
                event.key === "Shift")) {
            return;
        }
        setState(Object.assign(Object.assign({}, state), { [anchor]: open }));
    };
    const list = (anchor) => ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: { width: 250 }, role: "presentation", onClick: toggleDrawer(anchor, false), onKeyDown: toggleDrawer(anchor, false) }, { children: [(0, jsx_runtime_1.jsxs)(List_1.default, { children: [(0, jsx_runtime_1.jsx)(ListItem_1.default, Object.assign({ disablePadding: true }, { children: (0, jsx_runtime_1.jsxs)(ListItemButton_1.default, Object.assign({ component: react_router_dom_1.Link, to: "/" }, { children: [(0, jsx_runtime_1.jsx)(ListItemIcon_1.default, { children: (0, jsx_runtime_1.jsx)(PointOfSale_1.default, {}) }), (0, jsx_runtime_1.jsx)(ListItemText_1.default, { primary: "Sales" })] })) })), (0, jsx_runtime_1.jsx)(ListItem_1.default, Object.assign({ disablePadding: true }, { children: (0, jsx_runtime_1.jsxs)(ListItemButton_1.default, Object.assign({ component: react_router_dom_1.Link, to: "/items" }, { children: [(0, jsx_runtime_1.jsx)(ListItemIcon_1.default, { children: (0, jsx_runtime_1.jsx)(FormatListBulleted_1.default, {}) }), (0, jsx_runtime_1.jsx)(ListItemText_1.default, { primary: "Items" })] })) })), (0, jsx_runtime_1.jsx)(ListItem_1.default, Object.assign({ disablePadding: true }, { children: (0, jsx_runtime_1.jsxs)(ListItemButton_1.default, Object.assign({ component: react_router_dom_1.Link, to: "/category" }, { children: [(0, jsx_runtime_1.jsx)(ListItemIcon_1.default, { children: (0, jsx_runtime_1.jsx)(Category_1.default, {}) }), (0, jsx_runtime_1.jsx)(ListItemText_1.default, { primary: "Category" })] })) }))] }), (0, jsx_runtime_1.jsx)(Divider_1.default, {}), (0, jsx_runtime_1.jsx)(List_1.default, { children: (0, jsx_runtime_1.jsx)(ListItem_1.default, Object.assign({ disablePadding: true }, { children: (0, jsx_runtime_1.jsxs)(ListItemButton_1.default, Object.assign({ component: react_router_dom_1.Link, to: "/receipts" }, { children: [(0, jsx_runtime_1.jsx)(ListItemIcon_1.default, { children: (0, jsx_runtime_1.jsx)(Category_1.default, {}) }), (0, jsx_runtime_1.jsx)(ListItemText_1.default, { primary: "Receipts" })] })) })) }), (0, jsx_runtime_1.jsx)(Divider_1.default, {}), (0, jsx_runtime_1.jsx)(List_1.default, { children: ["Discounts", "Settings"].map((text, index) => ((0, jsx_runtime_1.jsx)(ListItem_1.default, Object.assign({ disablePadding: true }, { children: (0, jsx_runtime_1.jsxs)(ListItemButton_1.default, { children: [(0, jsx_runtime_1.jsx)(ListItemIcon_1.default, { children: index % 2 === 0 ? (0, jsx_runtime_1.jsx)(MoveToInbox_1.default, {}) : (0, jsx_runtime_1.jsx)(Mail_1.default, {}) }), (0, jsx_runtime_1.jsx)(ListItemText_1.default, { primary: text })] }) }), text))) })] })));
    return ((0, jsx_runtime_1.jsx)("div", { children: ["left"].map((anchor) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsx)(IconButton_1.default, Object.assign({ size: "large", edge: "start", color: "inherit", "aria-label": "open drawer", sx: { mr: 2 }, onClick: toggleDrawer(anchor, true) }, { children: (0, jsx_runtime_1.jsx)(Menu_1.default, {}) })), (0, jsx_runtime_1.jsx)(Drawer_1.default, Object.assign({ anchor: anchor, open: state[anchor], onClose: toggleDrawer(anchor, false) }, { children: list(anchor) }))] }, anchor))) }));
}
exports.default = LeftDrawer;
