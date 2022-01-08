import { Box, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import useBreakpoint from 'hooks/useBreakpoint'
import Socials from 'components/Socials/Socials'
import Link from 'components/Link/Link'
import Divider from 'components/Divider/Divider'

export default function Footer() {
  const { t } = useTranslation('common')
  const isDownMd = useBreakpoint()
  const theme = useTheme()

  return (
    <Box
      sx={{
        mt: 60,
        height: theme.height.footer,
        pb: 12,
      }}
      display="flex"
      flexDirection={isDownMd ? 'column' : 'row'}
      justifyContent={isDownMd ? 'space-between' : 'space-between'}
      alignItems="center"
      // mb={18}
    >
      <Box display="flex" gap="12px">
        <Typography variant="body1">Let's chat at</Typography>
        <Socials primary />
      </Box>

      <Box>
        <Typography variant="body2" textAlign={isDownMd ? 'center' : 'left'}>
          {t('footer.copyright')}
        </Typography>

        <Typography variant="body2" textAlign={isDownMd ? 'center' : 'left'}>
          <Link href="/privacy-policy">Privacy Policy</Link> |{' '}
          <Link href="terms-and-conditions">Terms and Conditions</Link>
        </Typography>
      </Box>
    </Box>
  )
}
