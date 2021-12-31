import { Box, Typography, useTheme } from '@mui/material'
import Container from '../Container/Container'
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
        backgroundColor: theme.palette.primary.main,
        mt: 30,
      }}
    >
      <Container>
        <Box padding="30px 20px">
          <Box display="flex" gap="12px" justifyContent={matches ? 'center' : 'flex-start'}>
            <Typography color={theme.palette.primary.contrastText} fontWeight={500}>
              Let's chat at
            </Typography>
            <Socials />
          </Box>

          <Typography fontSize={12} color={theme.palette.primary.contrastText} textAlign={matches ? 'center' : 'left'}>
            {t('footer.copyright')}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
