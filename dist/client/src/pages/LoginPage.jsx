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
const React = __importStar(require("react"));
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
    return (<Typography_1.default variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link_1.default color="inherit" href="https://mui.com/">
        PLJ's Corner
      </Link_1.default>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography_1.default>);
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
        return <react_router_dom_1.Navigate to="/"/>;
    }
    return (<styles_1.ThemeProvider theme={theme}>
      <Grid_1.default container component="main" sx={{ height: '100vh' }}>
        <CssBaseline_1.default />
        <Grid_1.default item xs={false} sm={4} md={7} sx={{
            backgroundImage: 'url(/pljscorner.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}/>
        <Grid_1.default item xs={12} sm={8} md={5} component={Paper_1.default} elevation={6} square>
          <Box_1.default sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Avatar_1.default sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlined_1.default />
            </Avatar_1.default>
            <Typography_1.default component="h1" variant="h5">
              Sign in
            </Typography_1.default>
            <Box_1.default component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField_1.default margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={handleChange}/>
              <TextField_1.default margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={handleChange}/>
              {errors.map(function (error) {
            return (<Alert_1.default severity="error">{error.message}</Alert_1.default>);
        })}
              <FormControlLabel_1.default control={<Checkbox_1.default value="remember" color="primary"/>} label="Remember me"/>
              <Button_1.default type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button_1.default>
              <Grid_1.default container>
                <Grid_1.default item xs>
                  <Link_1.default href="#" variant="body2">
                    Forgot password?
                  </Link_1.default>
                </Grid_1.default>
                {/* <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid> */}
              </Grid_1.default>
              <Copyright sx={{ mt: 5 }}/>
            </Box_1.default>
          </Box_1.default>
        </Grid_1.default>
      </Grid_1.default>
    </styles_1.ThemeProvider>);
}
exports.default = Login;
