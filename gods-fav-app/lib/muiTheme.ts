import { createTheme } from '@mui/material'

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8B0000' },
    background: { default: '#000', paper: '#080808' },
    text: { primary: '#E8E2D9', secondary: '#555' },
  },
  shape: { borderRadius: 0 },
  typography: { fontFamily: 'inherit' },
  components: {
    MuiAppBar: {
      styleOverrides: { root: { background: 'transparent', boxShadow: 'none' } }
    },
    MuiButton: {
      styleOverrides: { root: { borderRadius: 0 } }
    },
  }
})
