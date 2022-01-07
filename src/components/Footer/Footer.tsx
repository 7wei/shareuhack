import { Box, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import useBreakpoint from 'hooks/useBreakpoint'
import Socials from 'components/Socials/Socials'

export default function Footer() {
  const { t } = useTranslation('common')
  const matches = useBreakpoint()
  const theme = useTheme()

  return (
    <Box
      sx={{
        mt: 60,
        height: theme.height.footer,
        pb: 12,
      }}
      display="flex"
      flexDirection={matches ? 'column' : 'row'}
      justifyContent={matches ? 'space-between' : 'space-between'}
      alignItems="center"
      // mb={18}
    >
      <Box display="flex" gap="12px">
        <Typography variant="body1">Let's chat at</Typography>
        <Socials primary />
      </Box>

      <Typography variant="body2" textAlign={matches ? 'center' : 'left'}>
        {t('footer.copyright')}
      </Typography>
    </Box>
  )
}
