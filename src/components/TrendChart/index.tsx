import { useEffect } from 'react'

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

  return <div id={id}></div>
}
