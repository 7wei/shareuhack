import { TYPE } from 'theme/index'
import { Routes } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import StyledLink from '../Link/Link'
import { useRouter } from 'next/router'

export default function Disclosure() {
  const router = useRouter()
  const { locale } = router
  const { t } = useTranslation('common')

  return (
    <TYPE.primary textAlign="center" fontSize="14px" mb="48px">
      {t('disclosure') + ' '}
      <Link href={Routes.about} locale={locale} passHref>
        <StyledLink>--{t('learnMore')}</StyledLink>
      </Link>
    </TYPE.primary>
  )
}
