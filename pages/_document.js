import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import theme from '../src/theme'
import { useRouter } from 'next/router'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* PWA primary color */}
          {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
          <meta property="og:site_name" content="Shareuhack: Hacks for the real life" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Sans+TC:wght@400;500;700&family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', { page_path: window.location.pathname });
            `,
            }}
          />

          {/* Google Adsense */}
          {/* <script
            data-ad-client="ca-pub-8686253077478682"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script> */}

          <script
            dangerouslySetInnerHTML={{
              __html: `(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)}
            h._hjSettings={hjid:2609307,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
            }}
          />
          {/*
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "8ie5om3g7d");`,
            }}
          /> */}

          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T32Z3BT');`,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
              var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
              f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i);
              var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000));
              _.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml');

              var ml_account = ml('accounts', '3616085', 'z2m5d4m0k5', 'load');`,
            }}
          />
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `          <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-T32Z3BT"
              height="0"
              width="0"
              style="display:none;visibility:hidden"
            ></iframe>`,
            }}
          ></noscript>
          {/* End Google Tag Manager (noscript) */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  }
}
