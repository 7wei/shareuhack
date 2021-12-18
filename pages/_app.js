import React, { useEffect } from 'react'
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material'
import theme from '../src/theme'
import Layout from '../src/components/Layout/Layout'
import { appWithTranslation } from 'next-i18next'

export function App({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MuiThemeProvider>
    </React.Fragment>
  )
}

export default appWithTranslation(App)
