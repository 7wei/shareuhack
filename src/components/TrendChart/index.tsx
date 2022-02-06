import { useEffect } from 'react'
import { Typography } from '@mui/material'
import Link from 'components/Link/Link'

declare global {
  interface Window {
    trends?: any
  }
}

const GOOGLE_TREND_BASE_URL = 'https://trends.google.com/trends/explore'

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
      <div id={id}></div>
      <Typography sx={{ opacity: 0.5 }}>
        *若沒有正常顯示，請
        <Link
          color="blue"
          href={GOOGLE_TREND_BASE_URL + '?' + exploreQuery}
          title={id}
          disableHover
          target="_blank"
          type="external"
        >
          點擊
        </Link>
        直接至Google Trends瀏覽
      </Typography>
    </>
  )
}
