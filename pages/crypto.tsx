import { useMemo, useRef } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Typography, Grid, Box, useTheme } from '@mui/material'
import Spinner from '../src/components/Spinner'
import dynamic from 'next/dynamic'
import { usePrice, usePriceSet } from '../src/hooks/usePriceSet'
import Card from '../src/components/Card'

export default function Crypto({}) {
  const graphContainer = useRef<HTMLDivElement>(null)
  const BTCPrice = usePrice('BTC')
  const priceSet = usePriceSet('BTC', 14)
  const theme = useTheme()

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
      <Typography fontSize={36} fontWeight={700} component="h1">
        Crypto Dashboard
      </Typography>
      <Typography mt={12} fontSize={16}>
        一眼即可掌握加密貨幣的關鍵數據
      </Typography>
      <Card width={'fit-content'} padding={30} outlined color={theme.palette.primary.main}>
        <Typography fontSize={16} fontWeight={700}>
          BTC Price
        </Typography>
        <Typography fontSize={16} fontWeight={500}>
          {`${(+BTCPrice).toFixed(2)} USDT`}
        </Typography>
      </Card>

      <Grid container>
        <Grid
          item
          xs={12}
          // md={6}
          sx={{
            height: { xs: '300px', md: '100%', maxWidth: '100%', width: { xs: '100%', md: 'auto' } },
          }}
          // ref={graphContainer}
        >
          <Box width={'100%'} height={360}>
            {Chart}
          </Box>
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
