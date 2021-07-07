import { createTheme, Theme, styled } from '@material-ui/core'

const theme: Theme = createTheme({
  palette: {
    primary: {
      light: '#2E2247',
      main: '#9867FF',
      dark: '#7433FF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#1D152D',
      main: '#211735',
      dark: '#3E276B',
      contrastText: '#9867FF',
    },
    error: {
      main: '#F53030',
    },
    warning: {
      main: '#9867FF',
    },
    info: {
      main: '#9867FF',
    },
    success: {
      main: '#2DAB50',
    },
    background: {
      default: '#131315',
    },
    text: {
      primary: '#FFFFFF',
    },
    action: {
      disabledOpacity: 0.8,
    },
  },
})

export const HideOnMobile = styled('div')(({ theme, breakpoint }: { theme: Theme; breakpoint?: 'sm' | 'md' }) => ({
  [theme.breakpoints.down(breakpoint ?? 'md')]: {
    display: 'none',
  },
}))

export const ShowOnMobile = styled('div')(({ theme, breakpoint }: { theme: Theme; breakpoint?: 'sm' | 'md' }) => ({
  display: 'none',
  [theme.breakpoints.down(breakpoint ?? 'md')]: {
    display: 'block',
  },
}))

export default theme
