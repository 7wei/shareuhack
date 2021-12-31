import { createTheme, styled, ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles'

interface Gradient {
  gradient1: string
}

interface Height {
  header: string
  mobileHeader: string
  footer: string
}

// interface TextColor {
//   text1: string
//   text2: string
//   text3: string
//   text4: string
//   text5: string
//   primary: string
// }

// interface BgColor {
//   bg1: string
//   bg2: string
//   bg3: string
//   bg4: string
//   bg5: string
// }

declare module '@mui/material/styles' {
  interface Theme {
    // textColor: TextColor
    // bgColor: BgColor
    gradient: Gradient
    height: Height
  }
  interface DeprecatedThemeOptions {
    // textColor: TextColor
    // bgColor: BgColor
    gradient: Gradient
    height: Height
  }
}

declare module '@mui/material/styles/createTheme' {
  interface DeprecatedThemeOptions {
    // textColor: TextColor
    // bgColor: BgColor
    gradient: Gradient
    height: Height
  }
  interface ThemeOptions {
    // textColor: TextColor
    // bgColor: BgColor
    gradient: Gradient
    height: Height
  }
  interface Theme {
    // textColor: TextColor
    // bgColor: BgColor
    gradient: Gradient
    height: Height
  }
}

export const theme = {
  palette: {
    primary: {
      light: '#2E2247',
      main: '#00a651',
      dark: '#036935',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#1D152D',
      main: '#211735',
      dark: '#3E276B',
      contrastText: '#00a651',
    },
    error: {
      main: '#F53030',
    },
    warning: {
      main: '#00a651',
    },
    info: {
      main: '#00a651',
    },
    success: {
      main: '#2DAB50',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
      // default: '#FFFFFF',
      // paper: 'rgba(255,255,255,0.6)',
    },
    text: {
      // primary: '#FFFFFF',
      // secondary: 'rgba(255,255,255,0.6)',
      disabled: '#999999',
      primary: '#1C1C1F',
      secondary: '#191919',
    },
    action: {
      disabledOpacity: 0.8,
    },
    grey: {
      A700: '#191919',
      A400: '#252525',
      A200: '#303030',
      A100: '#A1A1A1',
    },
  },
  textColor: {
    text1: '#FFFFFF',
    text2: '#CCCCCC',
    text3: '#999999',
    text4: '#727272',
    text5: '#333333',
    primary: '#00a651',
  },
  // bgColor: {
  //   bg1: '#000000',
  //   bg2: '#191919',
  //   bg3: '#252525',
  //   bg4: '#303030',
  //   bg5: '#A1A1A1',
  // },
  gradient: {
    gradient1: '#000000 linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)',
  },
  height: {
    header: '60px',
    footer: '120px',
  },
  shape: {
    border: '1px solid',
    borderRadius: 5,
  },
  spacing: (factor: number) => `${1 * factor}px`,
  // gray: {
  //   main: '#333333',
  //   dark: '#262626',
  // },
}

// font-family: 'Noto Sans JP', sans-serif;
// font-family: 'Noto Sans SC', sans-serif;
// font-family: 'Noto Sans TC', sans-serif;
// font-family: 'Noto Serif JP', serif;
// font-family: 'Noto Serif SC', serif;
// font-family: 'Noto Serif TC', serif;
const FONTS = {
  title: 'Noto Serif TC, Noto Serif JP, Noto Serif SC, serif',
  content: 'Noto Sans TC, Noto Sans JP, Noto Sans SC,, sans-serif',
}

export const override: any = {
  MuiCssBaseline: {
    styleOverrides: {
      body: { backgroundColor: theme.palette.background.default, fontSize: 14 },
      'html, input, textarea, button': {
        fontFamily: FONTS.title,
        fontDisplay: 'fallback',
      },
      '@supports (font-variation-settings: normal)': {
        'html, input, textarea, button ': {
          fontFamily: FONTS.title,
          fontDisplay: 'fallback',
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        fontFamily: 'Noto Sans, sans-serif',
        color: theme.palette.primary.contrastText,
        fontWeight: 500,
        borderRadius: theme.shape.borderRadius,
        transition: '.3s',
        textTransform: 'none' as const,
      },
      contained: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: 'unset',
        '&:hover, :active': {
          boxShadow: 'unset',
          backgroundColor: theme.palette.primary.dark,
        },
        '&:disabled': {
          backgroundColor: theme.palette.primary.light,
          color: '#464647',
        },
      },
      containedSecondary: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        boxShadow: 'unset',
        '&:hover, :active': {
          boxShadow: 'unset',
          backgroundColor: theme.palette.secondary.dark,
        },
        '&:disabled': {
          backgroundColor: theme.palette.secondary.light,
          color: '#412E6A',
        },
      },
      outlined: {
        borderColor: theme.palette.primary.contrastText,
        color: theme.palette.primary.contrastText,
        '&:hover, :active': {
          backgroundColor: 'transparent',
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
        },
      },
      outlinedPrimary: {
        backgroundColor: 'transparent',
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        '&:hover, :active': {
          backgroundColor: 'transparent',
          borderColor: theme.palette.primary.dark,
          color: theme.palette.primary.dark,
        },
      },
      text: {
        backgroundColor: 'transparent',
        color: theme.palette.primary.contrastText,
        '&:hover, :active': {
          backgroundColor: 'transparent',
          color: theme.palette.primary.main,
        },
      },
      textPrimary: {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
        '&:hover, :active': {
          backgroundColor: 'transparent',
          color: theme.palette.primary.dark,
        },
      },
      textSecondary: {
        color: theme.palette.secondary.main,
        backgroundColor: 'transparent',
        '&:hover, :active': {
          backgroundColor: 'transparent',
          color: theme.palette.secondary.dark,
        },
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        fontWeight: 300,
        fontFamily: FONTS.content,
      },
      body1: {
        fontFamily: FONTS.content,
        fontSize: 14,
      },
      body2: {
        fontFamily: FONTS.content,
        fontSize: 12,
      },
      h1: {
        fontWeight: 700,
        fontSize: 40,
        fontFamily: FONTS.title,
      },
      h4: {
        fontWeight: 700,
        fontSize: 14,
        fontFamily: FONTS.title,
      },
      h5: {
        fontWeight: 700,
        fontFamily: FONTS.title,
      },
      h6: {
        fontWeight: 700,
        fontSize: 16,
        fontFamily: FONTS.title,
      },
      // caption: {
      //   fontSize: 12,
      // },
      // subtitle1: {},
      // subtitle2: {},
    },
  },
}

export const HideOnMobile = styled('div', {
  shouldForwardProp: () => true,
})<{ breakpoint?: 'sm' | 'md' }>(({ theme, breakpoint }) => ({
  [theme.breakpoints.down(breakpoint ?? 'sm')]: {
    display: 'none',
  },
}))

export const ShowOnMobile = styled('div', {
  shouldForwardProp: () => true,
})<{ breakpoint?: 'sm' | 'md' }>(({ theme, breakpoint }) => ({
  display: 'none',
  [theme.breakpoints.down(breakpoint ?? 'sm')]: {
    display: 'block',
  },
}))

export default createTheme({
  ...theme,
  components: {
    ...override,
  },
})

export function ThemeProvider({ children, theme }: any) {
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </StyledEngineProvider>
  )
}
