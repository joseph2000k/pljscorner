"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Avatar_1 = __importDefault(require("@mui/material/Avatar"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const CssBaseline_1 = __importDefault(require("@mui/material/CssBaseline"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const Alert_1 = __importDefault(require("@mui/material/Alert"));
const FormControlLabel_1 = __importDefault(require("@mui/material/FormControlLabel"));
const Checkbox_1 = __importDefault(require("@mui/material/Checkbox"));
const Link_1 = __importDefault(require("@mui/material/Link"));
const Paper_1 = __importDefault(require("@mui/material/Paper"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const LockOutlined_1 = __importDefault(require("@mui/icons-material/LockOutlined"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const styles_1 = require("@mui/material/styles");
const authContext_1 = require("../context/authContext");
const hooks_1 = require("../utility/hooks");
const react_hooks_1 = require("@apollo/react-hooks");
const styles_2 = require("@mui/material/styles");
const client_1 = require("@apollo/client");
const react_router_dom_1 = require("react-router-dom");
const LOGIN_INPUT = (0, client_1.gql) `
mutation Login($loginInput: LoginInput) {
  login(loginInput: $loginInput) {
    username
    email
    token
  }
}
`;
function Copyright(props) {
    return ((0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ variant: "body2", color: "text.secondary", align: "center" }, props, { children: ['Copyright © ', (0, jsx_runtime_1.jsx)(Link_1.default, Object.assign({ color: "inherit", href: "https://mui.com/" }, { children: "PLJ's Corner" })), ' ', new Date().getFullYear(), '.'] })));
}
function Login(props) {
    const context = (0, react_1.useContext)(authContext_1.AuthContext);
    let navigate = (0, react_router_dom_1.useNavigate)();
    const [errors, setErrors] = (0, react_1.useState)([]);
    function loginUserCallback() {
        login();
    }
    const { handleChange, handleSubmit, formData } = (0, hooks_1.useForm)(loginUserCallback, {
        email: '',
        password: '',
    });
    const [login, { loading }] = (0, react_hooks_1.useMutation)(LOGIN_INPUT, {
        update(proxy, { data: { login: userData } }) {
            context.login(userData);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: {
            loginInput: formData
        }
    });
    const theme = (0, styles_2.useTheme)();
    if (context.user) {
        return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/" });
    }
    return ((0, jsx_runtime_1.jsx)(styles_1.ThemeProvider, Object.assign({ theme: theme }, { children: (0, jsx_runtime_1.jsxs)(Grid_1.default, Object.assign({ container: true, component: "main", sx: { height: '100vh' } }, { children: [(0, jsx_runtime_1.jsx)(CssBaseline_1.default, {}), (0, jsx_runtime_1.jsx)(Grid_1.default, { item: true, xs: false, sm: 4, md: 7, sx: {
                        backgroundImage: 'url(/pljscorner.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    } }), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 12, sm: 8, md: 5, component: Paper_1.default, elevation: 6, square: true }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: {
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        } }, { children: [(0, jsx_runtime_1.jsx)(Avatar_1.default, Object.assign({ sx: { m: 1, bgcolor: 'secondary.main' } }, { children: (0, jsx_runtime_1.jsx)(LockOutlined_1.default, {}) })), (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ component: "h1", variant: "h5" }, { children: "Sign in" })), (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ component: "form", onSubmit: handleSubmit, noValidate: true, sx: { mt: 1 } }, { children: [(0, jsx_runtime_1.jsx)(TextField_1.default, { margin: "normal", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", autoFocus: true, onChange: handleChange }), (0, jsx_runtime_1.jsx)(TextField_1.default, { margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", autoComplete: "current-password", onChange: handleChange }), errors.map(function (error) {
                                        return ((0, jsx_runtime_1.jsx)(Alert_1.default, Object.assign({ severity: "error" }, { children: error.message })));
                                    }), (0, jsx_runtime_1.jsx)(FormControlLabel_1.default, { control: (0, jsx_runtime_1.jsx)(Checkbox_1.default, { value: "remember", color: "primary" }), label: "Remember me" }), (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3, mb: 2 } }, { children: "Sign In" })), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ container: true }, { children: (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: true }, { children: (0, jsx_runtime_1.jsx)(Link_1.default, Object.assign({ href: "#", variant: "body2" }, { children: "Forgot password?" })) })) })), (0, jsx_runtime_1.jsx)(Copyright, { sx: { mt: 5 } })] }))] })) }))] })) })));
}
exports.default = Login;
