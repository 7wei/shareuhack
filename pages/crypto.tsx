import { useMemo, useRef } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Typography, Grid, Box } from '@mui/material'
import Spinner from '../src/components/Spinner'
import dynamic from 'next/dynamic'
import { usePrice, usePriceSet } from '../src/hooks/usePriceSet'

export default function Crypto({}) {
  const graphContainer = useRef<HTMLDivElement>(null)
  const BTCPrice = usePrice('BTC')
  const priceSet = usePriceSet('BTC')

  const Chart = useMemo(() => {
    const LineChart = dynamic(() => import('../src/components/Chart'), {
      ssr: false,
    })

    return priceSet ? (
      <LineChart
        lineColor="#18A0FB"
        lineSeriesData={priceSet}
        unit="BTC"
        id="incomeGraph"
        height={graphContainer?.current?.offsetHeight ?? 280}
        // strikeData={strikeLineData}
      />
    ) : (
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        <Spinner size={60} marginRight="auto" marginLeft="auto" />
      </Box>
    )
  }, [priceSet])

  return (
    <>
      <Typography variant="h2">Crypto Dashboard</Typography>
      <Typography variant="h3">BTC: {(+BTCPrice).toFixed(2)}</Typography>
      <Grid container>
        <Grid
          item
          xs={12}
          // md={6}
          sx={{
            height: { xs: '300px', md: '100%', maxWidth: '100%', width: { xs: '100%', md: '100%' } },
          }}
          // ref={graphContainer}
        >
          <Box>{Chart}</Box>
        </Grid>
      </Grid>
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
