"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const authContext_1 = require("../../context/authContext");
const PrivateRoute = () => {
    const { user } = (0, react_1.useContext)(authContext_1.AuthContext);
    return user ? (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}) : (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/login" });
};
exports.default = PrivateRoute;
