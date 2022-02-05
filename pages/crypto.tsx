import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Typography } from '@mui/material'
import LineChart from '../src/components/Chart'
import { usePrice } from '../src/hooks/usePriceSet'

export default function Crypto({}) {
  const BTCPrice = usePrice('BTC')

  return (
    <>
      <Typography variant="h2">Crypto Dashboard</Typography>
      <Typography variant="h3">BTC: {BTCPrice}</Typography>
      {/* <LineChart
        lineColor="#18A0FB"
        lineSeriesData={priceSet}
        unit="BTC"
        id="incomeGraph"
        height={graphContainer?.current?.offsetHeight ?? 280}
        strikeData={strikeLineData}
      /> */}
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
