import { useMemo, useRef } from 'react'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Typography, Grid, Box, useTheme } from '@mui/material'
import Spinner from '../src/components/Spinner'
import dynamic from 'next/dynamic'
import { usePriceSet } from '../src/hooks/usePriceSet'
import Card from '../src/components/Card'
import BtcLogo from '../src/assets/btc.svg'
import { useFnG } from '../src/hooks/useFnG'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { CMS_NAME, OG_IMAGE_URL } from '../lib/constants'
import TrendChart from '../src/components/TrendChart'
import Link from '../src/components/Link/Link'

const LineChart = dynamic(() => import('../src/components/Chart'), {
  ssr: false,
})

// const TrendChart = dynamic(() => import('../src/components/TrendChart'), {
//   ssr: false,
// })

const pastDays = 730

export default function Crypto({}) {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const graphContainer = useRef<HTMLDivElement>(null)
  const BTCPriceSeriesData = usePriceSet('BTC', pastDays)
  const FnGSeriesData = useFnG(pastDays)

  const mappedFnGSeriesData = FnGSeriesData.map(({ time, value }) => {
    return {
      time,
      value,
    }
  })

  const BTCPriceChart = useMemo(() => {
    return BTCPriceSeriesData ? (
      <LineChart
        lineColor="#18A0FB"
        lineSeriesData={BTCPriceSeriesData}
        unit="BTC"
        id="btcPriceChart"
        height={graphContainer?.current?.offsetHeight ?? 280}
        // strikeData={strikeLineData}
      />
    ) : (
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        <Spinner size={60} marginRight="auto" marginLeft="auto" />
      </Box>
    )
  }, [BTCPriceSeriesData])

  const FnGChart = useMemo(() => {
    return BTCPriceSeriesData ? (
      <LineChart
        lineSeriesData={mappedFnGSeriesData}
        unit="BTC"
        id="FnGChart"
        height={graphContainer?.current?.offsetHeight ?? 280}
        lineColor={theme.palette.primary.main}
        // strikeData={strikeLineData}
      />
    ) : (
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        <Spinner size={60} marginRight="auto" marginLeft="auto" />
      </Box>
    )
  }, [mappedFnGSeriesData])

  return (
    <>
      <Head>
        <title>
          {CMS_NAME} | {t('crypto')}
        </title>
        <meta name="description" content={t('cryptoDescript')} />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_BASE_URL + '/assets/brand/shareuhack-crypto.jpg'} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${CMS_NAME} | ${t('crypto')}`} />
        <meta property="og:description" content={t('cryptoDescript')} />
        <meta property="twitter:title" content={`${CMS_NAME} | ${t('crypto')}`} />
        <meta property="twitter:description" content={t('cryptoDescript')} />
        <meta property="twitter:card" content="summary" />
      </Head>
      <Typography fontSize={36} fontWeight={700} component="h1" textAlign="center" mt={24}>
        {t('crypto')}
      </Typography>
      <Typography mt={12} fontSize={16} sx={{ opacity: 0.6 }} textAlign="center">
        {t('cryptoDescript')}
      </Typography>
      <Grid container spacing={30} pt={15}>
        <Grid item xs={12} md={3}>
          <Card padding={30} outlined color={theme.palette.primary.main}>
            <Box display="flex" alignItems="center" gap={15}>
              <BtcLogo />
              <Typography fontSize={24} fontWeight={700}>
                BTC Price
              </Typography>
            </Box>

            <Typography fontSize={24} fontWeight={700} mt={18}>
              {`${(+BTCPriceSeriesData[BTCPriceSeriesData.length - 1]?.value).toFixed(2)} USDT`}
            </Typography>
            <Typography fontSize={14} fontWeight={400} sx={{ opacity: 0.5 }}>
              {/* Last Updated at{' '} */}
              {/* {dayjs(BTCPriceSeriesData[BTCPriceSeriesData.length - 1]?.time).format('YYYY-MM-DD HH:mm:ss')} */}
              Update every 5s
            </Typography>
            <Typography mt={12} mb={18} fontSize={16} sx={{ opacity: 0.6 }}>
              資料來源：
              <Link
                color="blue"
                href="https://www.binance.com/"
                title={'Binance'}
                disableHover
                target="_blank"
                type="external"
              >
                幣安Binance
              </Link>
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={9}>
          <Card padding={15} outlined color={theme.palette.primary.main}>
            {BTCPriceChart}
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card padding={30} outlined color={theme.palette.primary.main}>
            <Typography fontSize={24} fontWeight={700}>
              恐懼與貪婪指數(FnG Index)
            </Typography>
            <Typography fontSize={24} fontWeight={700}>
              {FnGSeriesData[FnGSeriesData.length - 1]?.value}
            </Typography>
            <Typography fontSize={24} fontWeight={700} color={theme.palette.error.main}>
              {FnGSeriesData[FnGSeriesData.length - 1]?.classification}
            </Typography>

            <Typography mt={12} mb={18} fontSize={16} sx={{ opacity: 0.6 }}>
              加密貨幣市場是非常情緒化的，當牛市時，人們容易產生FOMO情緒(Fear of missing
              out)，貪婪買進，而在熊市時恐慌拋售，「別人恐懼我貪婪」，然而，何時是恐懼；何時是貪婪？這個恐懼與貪婪指數，是由
              <Link
                color="blue"
                href={'https://alternative.me/crypto/fear-and-greed-index/'}
                title={'alternative.me'}
                disableHover
                target="_blank"
                type="external"
              >
                alternative.me
              </Link>
              依據下幾個資料來源，計算出的指標：1. 波動性 2. 市場動能/成交量 3. 社群媒體 4. 比特幣市值佔比(參考
              <Link
                color="blue"
                href={'https://coinmarketcap.com/zh-tw/charts/'}
                title={''}
                disableHover
                target="_blank"
                type="external"
              >
                CoinMarketCap全球加密貨幣圖表
              </Link>
              ) 5. Google Trends，以量化的方式幫助你識別現在市場的情緒狀況，而非個人情緒觀感。
            </Typography>

            {FnGChart}
            <Typography fontSize={14} fontWeight={400} sx={{ opacity: 0.5 }}>
              Last Updated at {dayjs(FnGSeriesData[FnGSeriesData.length - 1]?.time).format('YYYY-MM-DD HH:mm:ss')}
            </Typography>
            <Typography mt={12} mb={18} fontSize={16} sx={{ opacity: 0.6 }}>
              資料來源：
              <Link
                color="blue"
                href={'https://alternative.me/crypto/fear-and-greed-index/'}
                title={'alternative.me'}
                disableHover
                target="_blank"
                type="external"
              >
                alternative.me
              </Link>
            </Typography>
          </Card>
        </Grid>
        {/* <Grid item xs={12} md={9}>
          <Card padding={15} outlined color={theme.palette.primary.main}></Card>
        </Grid> */}
        <Grid item xs={12}>
          <Card padding={15} outlined color={theme.palette.primary.main}>
            <Typography fontSize={24} fontWeight={700}>
              趨勢分析：比特幣相關查詢
            </Typography>
            <Typography mt={12} mb={18} fontSize={16} sx={{ opacity: 0.6 }}>
              「buy bitcoin」代表新加入市場的數量；「bitcoin
              crash」代表了大眾對市場的猜疑和恐懼，或已發生的事實；「bitcoin usd」代表大眾對比特幣價錢的關注程度
            </Typography>
            <TrendChart
              id="trendDiv1"
              exploreQuery="date=today%203-m&q=buy%20bitcoin,bitcoin%20crash,bitcoin%20usd"
              comparisonItem={[
                { keyword: 'buy bitcoin', geo: '', time: 'today 3-m' },
                { keyword: 'bitcoin crash', geo: '', time: 'today 3-m' },
                { keyword: 'bitcoin usd', geo: '', time: 'today 3-m' },
              ]}
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card padding={15} outlined color={theme.palette.primary.main}>
            <Typography fontSize={24} fontWeight={700}>
              趨勢分析：前三大交易所
            </Typography>
            <Typography mt={12} mb={18} fontSize={16} sx={{ opacity: 0.6 }}>
              交易所關鍵字的搜索量，反映了欲嘗試、剛進入加密貨幣市場的投資者數量
            </Typography>
            <TrendChart
              id="trendDiv2"
              exploreQuery="date=today%203-m&q=binance,coinbase,FTX"
              comparisonItem={[
                { keyword: 'binance', geo: '', time: 'today 3-m' },
                { keyword: 'coinbase', geo: '', time: 'today 3-m' },
                { keyword: 'FTX', geo: '', time: 'today 3-m' },
              ]}
            />
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
