"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeOptions = void 0;
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
root.render(<authContext_1.AuthProvider>
    <client_2.ApolloProvider client={apolloClient_1.default}>
      <react_router_dom_1.BrowserRouter>
        <react_1.default.StrictMode>
          <styles_1.ThemeProvider theme={theme}>
            <App_1.default />
          </styles_1.ThemeProvider>
        </react_1.default.StrictMode>
      </react_router_dom_1.BrowserRouter>
    </client_2.ApolloProvider>
  </authContext_1.AuthProvider>);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
