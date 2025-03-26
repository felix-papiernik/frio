"use client";

import { createTheme } from "@mui/material/styles";
import { skSK } from '@mui/material/locale';

const xsBreakpoint = 0;
const smBreakpoint = 600;
const mdBreakpoint = 900;
const lgBreakpoint = 1240;
const xlBreakpoint = 1920;

export const theme = createTheme({
    palette: {
        mode: 'light',
        //https://coolors.co/fab201-1c1c1c-a2c5ac-9db5b2-878e99
        primary: {
            main: '#FAB201',
            // light: '#f83a28',
            dark: '#F4AF01',
            contrastText: '#FAFAFA',
        },
        secondary: {
            main: '#6C809A',
            contrastText: '#fff',
        },
        background: {
            default: "#f5f5f5",
            paper: "fff",
        },
    },
    breakpoints: {
        values: {
            xs: xsBreakpoint,
            sm: smBreakpoint,
            md: mdBreakpoint,
            lg: lgBreakpoint,
            xl: xlBreakpoint,
        },
    },
    typography: {
        allVariants: {
            textDecoration: 'none',
        },
        h1: {
            fontSize: '2.5rem',//3rem
            fontWeight: 700,
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '2.5rem',
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h3: {
            fontSize: '2rem',
            fontWeight: 500,
            lineHeight: 1.4,
        },
        h4: {
            fontSize: '1.75rem',
            fontWeight: 400,
            lineHeight: 1.5,
        },
        h5: {
            fontSize: '1.5rem',
            fontWeight: 400,
            lineHeight: 1.6,
        },
        h6: {
            fontSize: '1.25rem',
            fontWeight: 400,
            lineHeight: 1.7,
        },
        caption: {
            fontWeight: 400,
            fontSize: '1rem',
            '@media (min-width:1440px)': {
                fontSize: '1.25rem',
            },
        }
    },
    components: {
        MuiTypography: {
            defaultProps: {
                color: '#1C1C1C',
            }
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiButton: {
            styleOverrides: {
                outlinedPrimary: {
                    borderWidth: '2px',
                    '&:hover': {
                        borderWidth: '2px',
                    }
                },
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    fontSize: '0.85rem !important',
                }
            }
        },
    },
    spacing: 8,
},
    skSK
);
