import React, { useEffect } from 'react'
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material'
import theme from '../src/theme'
import Layout from '../src/components/Layout/Layout'
import { appWithTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Script from 'next/script'
import * as fbq from '../lib/fpixel'
import { bindTrackingClicks } from '../src/utils'

export function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    fbq.pageview()

    const handleRouteChange = () => {
      fbq.pageview()
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    bindTrackingClicks()
  }, [])

  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* Global Site Code Pixel - Facebook Pixel */}
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
          }}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MuiThemeProvider>
    </React.Fragment>
  )
}

export default appWithTranslation(App)
