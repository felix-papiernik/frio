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
        //https://coolors.co/d82323-1c1c1c-c6a15b-f2e86d-d3dfb8
        primary: {
            main: '#FAB201',
            // light: '#f83a28',
            // dark: '#cb1a1b',
            contrastText: '#FAFAFA',
        },
        secondary: {
            main: '#A2C5AC',
            // main: '#7EA0B7',//uranian blue
            contrastText: '#fff',
        },
        background: {
            default: "#fff",
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
        h1: {
            fontSize: '3rem',
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
        MuiPaper: {
            styleOverrides: {
                "rounded": {
                    borderRadius: 16
                }
            },
        },
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
