import Head from 'next/head'

import { useRouter } from 'next/router'

const indexWhiteList = ['zh-TW', 'zh-CN']

export default function Meta() {
  const { locale, locales, asPath } = useRouter()
  const canonicalUrl = process.env.NEXT_PUBLIC_BASE_URL + asPath

  return (
    <Head>
      {locale && !indexWhiteList.includes(locale) && <meta name="robots" content="noindex" />}
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      {locales
        ?.filter((el) => el !== 'zh-TW')
        .map((locale) => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + asPath}
          />
        ))}

      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="article:publisher" content="https://www.facebook.com/shareuhack" />
      <meta property="og:site_name" content="Shareuhack|Hacks for real life" />
      <meta property="og:locale" content={locale} />
      <meta
        property="og:url"
        content={locale === 'zh-TW' ? canonicalUrl : process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + asPath}
      />
      <meta property="og:image:alt" content="Shareuhack|Hacks for real life" />
      <meta name="twitter:site" content="@shareuhack" />
      <meta name="twitter:creator" content="@shareuhack" />
    </Head>
  )
}
