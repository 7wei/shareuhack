import { Box, Typography, useTheme } from '@mui/material'
import Container from '../Container/Container'
import theme from 'theme/index'
import FacebookIcon from '@mui/icons-material/Facebook'
import EmailIcon from '@mui/icons-material/Email'
import { useTranslation } from 'next-i18next'
import Link from '../../components/Link/Link'
import useBreakpoint from 'hooks/useBreakpoint'

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
            <Link
              color={theme.palette.primary.contrastText}
              href="https://www.facebook.com/shareuhack/"
              title="Shareuhack|Facebook Page"
            >
              <FacebookIcon fontSize="small" />
            </Link>
            <Link
              color={theme.palette.primary.contrastText}
              href="mailto:c@shareuhack.com"
              title="Shareuhack|Contact Email"
            >
              <EmailIcon fontSize="small" />
            </Link>
          </Box>

          <Typography fontSize={12} color={theme.palette.primary.contrastText} textAlign={matches ? 'center' : 'left'}>
            {t('footer.copyright')}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
