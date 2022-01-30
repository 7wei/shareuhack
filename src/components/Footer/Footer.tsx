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
          (function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
            var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
            f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i);
            var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000));
            _.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml');

            var ml_account = ml('accounts', '3616085', 'z2m5d4m0k5', 'load');
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
          <div className="ml-form-embed" data-account="3616085:z2m5d4m0k5" data-form="5224628:i3c0y2"></div>
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
