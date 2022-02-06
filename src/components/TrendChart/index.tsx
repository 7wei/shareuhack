import { useEffect } from 'react'
import Head from 'next/head'

declare global {
  interface Window {
    trends?: any
  }
}

export default function Trendchart({
  id,
  exploreQuery,
  comparisonItem,
}: {
  id: string
  exploreQuery: string
  comparisonItem: any
}) {
  useEffect(() => {
    const div = document.getElementById(id)

    if (!window.trends) {
      return
    }

    window.trends.embed.renderExploreWidgetTo(
      div,
      'TIMESERIES',
      {
        comparisonItem,
        category: 0,
        property: '',
      },
      {
        exploreQuery,
        guestPath: 'https://trends.google.com:443/trends/embed/',
      }
    )
  }, [])

  return (
    <>
      <Head>
        <script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/2790_RC04/embed_loader.js"></script>
      </Head>
      <div id={id}></div>
    </>
  )
}
