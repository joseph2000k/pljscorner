"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = exports.AuthContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const initialState = {
    user: null,
};
if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    const decodedToken = (0, jwt_decode_1.default)(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
    }
    else {
        initialState.user = decodedToken;
    }
}
const AuthContext = (0, react_1.createContext)({
    user: null,
    login: () => { },
    logout: () => { },
});
exports.AuthContext = AuthContext;
function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return Object.assign(Object.assign({}, state), { user: action.payload });
        case "LOGOUT":
            return Object.assign(Object.assign({}, state), { user: null });
        default:
            return state;
    }
}
function AuthProvider(props) {
    const [state, dispatch] = (0, react_1.useReducer)(authReducer, initialState);
    const login = (userData) => {
        localStorage.setItem("token", userData.token);
        const decodedToken = (0, jwt_decode_1.default)(userData.token);
        dispatch({
            type: "LOGIN",
            payload: decodedToken,
        });
    };
    const logout = () => {
        localStorage.removeItem("token");
        dispatch({
            type: "LOGOUT",
        });
    };
    return ((0, jsx_runtime_1.jsx)(AuthContext.Provider, Object.assign({ value: { user: state.user, login, logout } }, props)));
}
exports.AuthProvider = AuthProvider;
