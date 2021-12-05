import { TYPE } from 'theme/index'
import { Routes } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import Link from 'components/Link/Link'
import { useRouter } from 'next/router'

export default function Disclosure() {
  const router = useRouter()
  const { locale } = router
  const { t } = useTranslation('common')

  return (
    <TYPE.primary textAlign="center" fontSize="14px" mb="48px">
      {t('disclosure') + ' '}
      <Link href={Routes.about} locale={locale}>
        --{t('learnMore')}
      </Link>
    </TYPE.primary>
  )
}
