import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import {ThemeProvider, createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f950b2',
    },
    secondary: {
      main: 'rgb(220, 0, 78)',
    },
    background: {
      paper: '#fff',
    },
  },
});



const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <AuthProvider>
  <ApolloProvider client={client}>
    <BrowserRouter>
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>
  </BrowserRouter>
  </ApolloProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
