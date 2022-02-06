import Head from 'next/head'
import { FB_PIXEL_ID } from '../../../lib/fpixel'

import { useRouter } from 'next/router'

const indexWhiteList = ['zh-TW', 'zh-CN']

export default function Meta() {
  const { locale, locales, asPath } = useRouter()
  // const canonicalUrl = process.env.NEXT_PUBLIC_BASE_URL + asPath

  return (
    <Head>
      {locale && !indexWhiteList.includes(locale) && <meta name="robots" content="noindex" />}

      {/* {locales
        ?.filter((el) => el !== 'zh-TW')
        .map((locale) => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + asPath}
          />
        ))} */}

      {/* <link rel="alternate" hrefLang="x-default" href={canonicalUrl} /> */}
      {/* <link rel="canonical" href={canonicalUrl} /> */}
      <meta name="facebook-domain-verification" content="dceupnte0sxdva9be8z49eqypav2kr" />
      <meta property="article:publisher" content="https://www.facebook.com/shareuhack" />
      <meta property="og:site_name" content="Shareuhack | Hacks for real life" />
      <meta property="og:locale" content={locale} />
      {/* <meta
        property="og:url"
        content={locale === 'zh-TW' ? canonicalUrl : process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + asPath}
      /> */}
      <meta property="og:image:alt" content="Shareuhack | Hacks for real life" />
      <meta name="twitter:site" content="@shareuhack" />
      <meta name="twitter:creator" content="@shareuhack" />

      <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
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
      <script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/2790_RC04/embed_loader.js"></script>

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      <link rel="icon" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/favicon.svg" color="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  )
}
