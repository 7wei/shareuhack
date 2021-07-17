import Head from 'next/head'
import { CMS_NAME, HOME_OG_IMAGE_URL } from '../../lib/constants'

export default function Meta() {
  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      {/* <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" /> */}
      {/* <link rel="alternate" type="application/rss+xml" href="/feed.xml" /> */}
      <meta
        name="description"
        content="我們熱衷於研究、分享並實際測試實用的知識、生活密技，幫助你效率的做好每件事，成為LifeHacker！"
      />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
    </Head>
  )
}
