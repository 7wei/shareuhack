import { Link } from '@material-ui/core'
import { TYPE } from 'theme/index'
import { Routes } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'

export default function Disclosure() {
  const { t } = useTranslation('common')

  return (
    <TYPE.primary textAlign="center" fontSize="14px" mb="48px">
      {t('disclosure') + ' '}
      <Link href={Routes.about} underline="always">
        {t('learnMore')}
      </Link>
    </TYPE.primary>
  )
}
