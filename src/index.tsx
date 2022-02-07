import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@emotion/react';
import { AppTheme } from 'theming/theme';
import { CssBaseline } from '@mui/material';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={AppTheme}>
            <CssBaseline>
                <App />
            </CssBaseline>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
