import React, {useReducer, createContext} from 'react';
import jwtDecode from 'jwt-decode';


const initialState = {
    user: null,
}

if(localStorage.getItem('token')) {
    const token:any = (localStorage.getItem('token'));
    const decodedToken:any = jwtDecode(token);

    if(decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
    } else {
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext<any>({
    user: null,
    login: () => {},
    logout: () => {},
});

function authReducer(state: any, action: any) {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            }
        default:
            return state;
    }
}

function AuthProvider(props: any) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userData: any) => {
        localStorage.setItem('token', JSON.stringify(userData.token));
        dispatch({
            type: 'LOGIN',
            payload: userData,
        });
    }

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({
            type: 'LOGOUT',
        });
    }

    return (
        <AuthContext.Provider value={{user: state.user, login, logout}}
        {...props}
        />
    )
}

export {AuthContext, AuthProvider}