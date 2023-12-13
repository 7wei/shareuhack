import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import useBreakpoint from 'hooks/useBreakpoint'
import Socials from 'components/Socials/Socials'
import Link from 'components/Link/Link'
import Head from 'next/head'
import { useAmp } from 'next/amp'

export default function Footer() {
  const { t } = useTranslation('common')
  const isDownMd = useBreakpoint()
  const isAmp = useAmp()

  if (isAmp) {
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 45, paddingBottom: 15 }}
      >
        <p style={{ lineHeight: 1 }}>{t('footer.copyright')}</p>
        <div>
          <a href="/about">About Us</a> | <a href="/privacy-policy">Privacy Policy</a> |{' '}
          <a href="/terms-and-conditions">Terms and Conditions</a>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
            .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
            n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
            (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
            ml('account', '731054');
            `,
          }}
        />
      </Head>

      <Box
        sx={{
          mt: 60,
          // height: theme.height.footer,
          pb: 15,
        }}
      >
        <Box width="100%" maxWidth={360} margin="0 auto">
          <div className="ml-embedded" data-form="3HLM4x"></div>
          <Typography variant="h3" textAlign={'center'}>
            Let's keep in touch!
          </Typography>
        </Box>
        <Box mt={24} display="flex" flexDirection={'column'} alignItems="center" gap={24}>
          <Socials primary />
          <Box>
            <Typography variant="body2" textAlign={'center'}>
              {t('footer.copyright')}
            </Typography>

            <Typography variant="body2" textAlign={'center'}>
              <Link href="/about" title="About" type="nav">
                About Us
              </Link>{' '}
              |{' '}
              <Link href="/privacy-policy" title="Privacy Policy" type="nav">
                Privacy Policy
              </Link>{' '}
              |{' '}
              <Link href="/terms-and-conditions" title="Terms and Conditions" type="nav">
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}
