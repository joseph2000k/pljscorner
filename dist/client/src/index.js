"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeOptions = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
const App_1 = __importDefault(require("./App"));
const apolloClient_1 = __importDefault(require("./apolloClient"));
const client_2 = require("@apollo/client");
const react_router_dom_1 = require("react-router-dom");
const authContext_1 = require("./context/authContext");
const styles_1 = require("@mui/material/styles");
exports.themeOptions = {
    palette: {
        type: "light",
        primary: {
            main: "rgb(255,198,218)",
        },
        secondary: {
            main: "#f50057",
        },
    },
};
const theme = (0, styles_1.createTheme)(exports.themeOptions);
const root = client_1.default.createRoot(document.getElementById("root"));
root.render((0, jsx_runtime_1.jsx)(authContext_1.AuthProvider, { children: (0, jsx_runtime_1.jsx)(client_2.ApolloProvider, Object.assign({ client: apolloClient_1.default }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(styles_1.ThemeProvider, Object.assign({ theme: theme }, { children: (0, jsx_runtime_1.jsx)(App_1.default, {}) })) }) }) })) }));
