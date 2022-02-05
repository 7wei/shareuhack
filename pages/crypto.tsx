import { useMemo, useRef } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Typography, Grid, Box, useTheme } from '@mui/material'
import Spinner from '../src/components/Spinner'
import dynamic from 'next/dynamic'
import { usePrice, usePriceSet } from '../src/hooks/usePriceSet'
import Card from '../src/components/Card'
import Image from '../src/components/Image'
import BtcLogo from '../src/assets/btc.svg'

const LineChart = dynamic(() => import('../src/components/Chart'), {
  ssr: false,
})

export default function Crypto({}) {
  const graphContainer = useRef<HTMLDivElement>(null)
  const BTCPrice = usePrice('BTC')
  const priceSet = usePriceSet('BTC', 14)
  const theme = useTheme()

  const Chart = useMemo(() => {
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
      <Grid container spacing={30}>
        <Grid item xs={12}>
          <Typography fontSize={36} fontWeight={700} component="h1">
            Crypto Dashboard
          </Typography>
          <Typography mt={12} fontSize={16}>
            一眼掌握加密貨幣的關鍵數據
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card padding={30} outlined color={theme.palette.primary.main}>
            <Box display="flex" alignItems="center" gap={15}>
              <Image src={BtcLogo} />
              <Typography fontSize={24} fontWeight={700}>
                BTC
              </Typography>
            </Box>

            <Typography fontSize={24} fontWeight={500} mt={18}>
              {`${(+BTCPrice).toFixed(2)} USDT`}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={9}>
          <Card padding={30} outlined color={theme.palette.primary.main}>
            {Chart}
          </Card>
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
