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
        mt: 30,
        height: theme.height.footer,
        pt: 30,
      }}
    >
      <Box display="flex" gap="12px" justifyContent={matches ? 'center' : 'flex-start'} mb={18}>
        <Typography variant="body1">Let's chat at</Typography>
        <Socials primary />
      </Box>

      <Typography variant="body2" textAlign={matches ? 'center' : 'left'}>
        {t('footer.copyright')}
      </Typography>
    </Box>
  )
}
