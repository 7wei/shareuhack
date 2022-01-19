import { Typography, useTheme } from '@mui/material'
import { Routes } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import Link from 'components/Link/Link'
import { useRouter } from 'next/router'

export default function Disclosure() {
  const router = useRouter()
  const { locale } = router
  const { t } = useTranslation('common')
  const theme = useTheme()

  return (
    <Typography textAlign="center" fontSize="14px" mb="48px" color={theme.palette.primary.main}>
      {t('disclosure') + ' '}
      <Link href={Routes.about} locale={locale} title="About" type="nav">
        --{t('learnMore')}
      </Link>
    </Typography>
  )
}
