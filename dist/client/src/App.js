"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const POS_1 = __importDefault(require("./pages/POS"));
const LoginPage_1 = __importDefault(require("./pages/LoginPage"));
const Navbar_1 = __importDefault(require("./components/Navbar"));
const PrivateRoute_1 = __importDefault(require("./components/routing/PrivateRoute"));
const Items_1 = __importDefault(require("./pages/Items"));
const Category_1 = __importDefault(require("./pages/Category"));
const ReceiptPage_1 = __importDefault(require("./pages/ReceiptPage"));
function App() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Navbar_1.default, {}), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, Object.assign({ path: "/", element: (0, jsx_runtime_1.jsx)(PrivateRoute_1.default, {}) }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(POS_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/items", element: (0, jsx_runtime_1.jsx)(Items_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/category", element: (0, jsx_runtime_1.jsx)(Category_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/receipts", element: (0, jsx_runtime_1.jsx)(ReceiptPage_1.default, {}) })] })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(LoginPage_1.default, {}) })] })] }));
}
exports.default = App;
