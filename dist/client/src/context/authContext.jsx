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
exports.AuthProvider = exports.AuthContext = void 0;
const react_1 = __importStar(require("react"));
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
    return (<AuthContext.Provider value={{ user: state.user, login, logout }} {...props}/>);
}
exports.AuthProvider = AuthProvider;
