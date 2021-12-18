import { Box, Typography } from '@mui/material'
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

  return (
    <Box
      sx={{
        backgroundColor: '#282729',
      }}
    >
      <Container>
        <Box padding="30px 20px">
          <Box mb="15px" textAlign={matches ? 'center' : 'left'}>
            <Typography variant="h1" fontStyle="italic">
              Shareuhack
            </Typography>
            <Typography color={theme.palette.text.secondary} fontStyle="italic">
              Hacks for the real life
            </Typography>
          </Box>

          <Box display="flex" gap="12px" justifyContent={matches ? 'center' : 'flex-start'}>
            <Typography fontWeight={500}>Let's chat at</Typography>
            <Link href="https://www.facebook.com/shareuhack/">
              <FacebookIcon />
            </Link>
            <Link href="mailto:c@shareuhack.com">
              <EmailIcon />
            </Link>
          </Box>

          <Typography
            fontSize={12}
            color={theme.palette.text.secondary}
            mt="28px"
            pb="15px"
            textAlign={matches ? 'center' : 'left'}
          >
            {t('footer.copyright')}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
