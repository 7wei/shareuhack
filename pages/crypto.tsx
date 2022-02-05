import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Typography } from '@mui/material'

export default function Crypto({}) {
  return (
    <>
      <Typography variant="h2">Crypto Dashboard</Typography>
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
