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
const react_1 = require("react");
const styles_1 = require("@mui/material/styles");
const AppBar_1 = __importDefault(require("@mui/material/AppBar"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const InputBase_1 = __importDefault(require("@mui/material/InputBase"));
const Badge_1 = __importDefault(require("@mui/material/Badge"));
const MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
const Menu_1 = __importDefault(require("@mui/material/Menu"));
const Search_1 = __importDefault(require("@mui/icons-material/Search"));
const AccountCircle_1 = __importDefault(require("@mui/icons-material/AccountCircle"));
const ShoppingCart_1 = __importDefault(require("@mui/icons-material/ShoppingCart"));
const Notifications_1 = __importDefault(require("@mui/icons-material/Notifications"));
const MoreVert_1 = __importDefault(require("@mui/icons-material/MoreVert"));
const authContext_1 = require("../context/authContext");
const LeftDrawer_1 = __importDefault(require("./LeftDrawer"));
const Search = (0, styles_1.styled)("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: (0, styles_1.alpha)(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: (0, styles_1.alpha)(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));
const SearchIconWrapper = (0, styles_1.styled)("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));
const StyledInputBase = (0, styles_1.styled)(InputBase_1.default)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));
function PrimarySearchAppBar() {
    const { user, logout } = (0, react_1.useContext)(authContext_1.AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleClickMenuItem = (event) => {
        setAnchorEl(null);
        logout();
    };
    const menuId = "primary-search-account-menu";
    const renderMenu = ((0, jsx_runtime_1.jsxs)(Menu_1.default, Object.assign({ anchorEl: anchorEl, anchorOrigin: {
            vertical: "top",
            horizontal: "right",
        }, id: menuId, keepMounted: true, transformOrigin: {
            vertical: "top",
            horizontal: "right",
        }, open: isMenuOpen, onClose: handleMenuClose }, { children: [(0, jsx_runtime_1.jsx)(MenuItem_1.default, Object.assign({ onClick: handleMenuClose }, { children: "Profile" })), (0, jsx_runtime_1.jsx)(MenuItem_1.default, Object.assign({ onClick: handleMenuClose }, { children: "My account" })), (0, jsx_runtime_1.jsx)(MenuItem_1.default, Object.assign({ onClick: handleClickMenuItem }, { children: "Logout" }))] })));
    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = ((0, jsx_runtime_1.jsxs)(Menu_1.default, Object.assign({ anchorEl: mobileMoreAnchorEl, anchorOrigin: {
            vertical: "top",
            horizontal: "right",
        }, id: mobileMenuId, keepMounted: true, transformOrigin: {
            vertical: "top",
            horizontal: "right",
        }, open: isMobileMenuOpen, onClose: handleMobileMenuClose }, { children: [(0, jsx_runtime_1.jsxs)(MenuItem_1.default, { children: [(0, jsx_runtime_1.jsx)(IconButton_1.default, Object.assign({ size: "large", "aria-label": "show 4 new mails", color: "inherit" }, { children: (0, jsx_runtime_1.jsx)(Badge_1.default, Object.assign({ badgeContent: 4, color: "error" }, { children: (0, jsx_runtime_1.jsx)(ShoppingCart_1.default, {}) })) })), (0, jsx_runtime_1.jsx)("p", { children: "Cart" })] }), (0, jsx_runtime_1.jsxs)(MenuItem_1.default, { children: [(0, jsx_runtime_1.jsx)(IconButton_1.default, Object.assign({ size: "large", "aria-label": "show 17 new notifications", color: "inherit" }, { children: (0, jsx_runtime_1.jsx)(Badge_1.default, Object.assign({ badgeContent: 17, color: "error" }, { children: (0, jsx_runtime_1.jsx)(Notifications_1.default, {}) })) })), (0, jsx_runtime_1.jsx)("p", { children: "Notifications" })] }), (0, jsx_runtime_1.jsxs)(MenuItem_1.default, Object.assign({ onClick: handleProfileMenuOpen }, { children: [(0, jsx_runtime_1.jsx)(IconButton_1.default, Object.assign({ size: "large", "aria-label": "account of current user", "aria-controls": "primary-search-account-menu", "aria-haspopup": "true", color: "inherit" }, { children: (0, jsx_runtime_1.jsx)(AccountCircle_1.default, {}) })), (0, jsx_runtime_1.jsx)("p", { children: "Profile" })] }))] })));
    return user ? ((0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: { flexGrow: 1 } }, { children: [(0, jsx_runtime_1.jsx)(AppBar_1.default, Object.assign({ position: "fixed" }, { children: (0, jsx_runtime_1.jsxs)(Toolbar_1.default, { children: [(0, jsx_runtime_1.jsx)(LeftDrawer_1.default, {}), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "h6", noWrap: true, component: "div", sx: { display: { xs: "none", sm: "block" } } }, { children: "PLJ's Corner" })), (0, jsx_runtime_1.jsxs)(Search, { children: [(0, jsx_runtime_1.jsx)(SearchIconWrapper, { children: (0, jsx_runtime_1.jsx)(Search_1.default, {}) }), (0, jsx_runtime_1.jsx)(StyledInputBase, { placeholder: "Search\u2026", inputProps: { "aria-label": "search" } })] }), (0, jsx_runtime_1.jsx)(Box_1.default, { sx: { flexGrow: 1 } }), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: { display: { xs: "none", md: "flex" } } }, { children: [(0, jsx_runtime_1.jsx)(IconButton_1.default, Object.assign({ size: "large", "aria-label": "show 4 new mails", color: "inherit" }, { children: (0, jsx_runtime_1.jsx)(Badge_1.default, Object.assign({ badgeContent: 4, color: "error" }, { children: (0, jsx_runtime_1.jsx)(ShoppingCart_1.default, {}) })) })), (0, jsx_runtime_1.jsx)(IconButton_1.default, Object.assign({ size: "large", "aria-label": "show 17 new notifications", color: "inherit" }, { children: (0, jsx_runtime_1.jsx)(Badge_1.default, Object.assign({ badgeContent: 17, color: "error" }, { children: (0, jsx_runtime_1.jsx)(Notifications_1.default, {}) })) })), (0, jsx_runtime_1.jsx)(IconButton_1.default, Object.assign({ size: "large", edge: "end", "aria-label": "account of current user", "aria-controls": menuId, "aria-haspopup": "true", onClick: handleProfileMenuOpen, color: "inherit" }, { children: (0, jsx_runtime_1.jsx)(AccountCircle_1.default, {}) }))] })), (0, jsx_runtime_1.jsx)(Box_1.default, Object.assign({ sx: { display: { xs: "flex", md: "none" } } }, { children: (0, jsx_runtime_1.jsx)(IconButton_1.default, Object.assign({ size: "large", "aria-label": "show more", "aria-controls": mobileMenuId, "aria-haspopup": "true", onClick: handleMobileMenuOpen, color: "inherit" }, { children: (0, jsx_runtime_1.jsx)(MoreVert_1.default, {}) })) }))] }) })), renderMobileMenu, renderMenu] }))) : null;
}
exports.default = PrimarySearchAppBar;
