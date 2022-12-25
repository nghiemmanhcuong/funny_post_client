import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'toastr/build/toastr.min.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {BrowserRouter} from 'react-router-dom';
import {createTheme, Theme, ThemeProvider} from '@mui/material/styles';
import ModalContextProvider from './store/modal';
import { pink } from '@mui/material/colors';

const theme: Theme = createTheme({
    palette: {
        secondary:{
            main:pink[400]
        },
    },
    typography: {
        fontFamily:"'Inter', sans-serif",
        fontWeightMedium:600
    }
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <ModalContextProvider>
                        <App />
                    </ModalContextProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
