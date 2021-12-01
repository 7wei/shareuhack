import { Link as MuiLink, makeStyles, Box } from '@material-ui/core'
import { NavLinks, Routes } from '../../../lib/constants'
import Container from '../Container/Container'
import theme, { TYPE } from 'theme/index'
import FacebookIcon from '@material-ui/icons/Facebook'
import EmailIcon from '@material-ui/icons/Email'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useBreakpoint from 'hooks/useBreakpoint'
import StyledLink from '../../components/Link/Link'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#282729',
    // height: 180,
  },
  navlink: {
    fontSize: 16,
    textDecoration: 'none',
    color: 'inherit',
    position: 'relative',
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
    '&:after': {
      position: 'absolute',
      content: '""',
      height: 3,
      bottom: -4,
      margin: '0 auto',
      left: 0,
      right: 0,
      width: '100%',
      background: theme.palette.primary.main,
      transition: '.5s',
    },
    '&:hover:after': {
      width: '80%',
      background: theme.palette.primary.main,
    },
  },
})

export default function Footer() {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const { matches } = useBreakpoint()

  return (
    <Box className={classes.root}>
      <Container>
        {/* <Box display="flex" alignItems="center" paddingTop="36px" gridGap="12px">
          {NavLinks.map((link, idx) => (
            <Box key={idx}>
              <Link key={link.key} href={link.link} passHref locale={locale}>
                <MuiLink className={classes.navlink}> {t(`categories.${link.key}.title`)}</MuiLink>
              </Link>
            </Box>
          ))}
        </Box> */}
        <Box padding="30px 20px">
          <Box mb="15px" textAlign={matches ? 'center' : 'left'}>
            <TYPE.largeHeader>Shareuhack</TYPE.largeHeader>
            <TYPE.smallGray fontStyle="italic">Hacks for the real life</TYPE.smallGray>
          </Box>

          <Box display="flex" gridGap="12px" justifyContent={matches ? 'center' : 'flex-start'}>
            <TYPE.bold>Let's chat at</TYPE.bold>
            <Link href="https://www.facebook.com/shareuhack/" passHref>
              <StyledLink color="#FFFFFF" target="_blank">
                <FacebookIcon />
              </StyledLink>
            </Link>
            <Link href="mailto:c@shareuhack.com" passHref>
              <StyledLink color="#FFFFFF" target="_blank">
                <EmailIcon />
              </StyledLink>
            </Link>
          </Box>

          <TYPE.smallGray mt="28px" pb="15px" textAlign={matches ? 'center' : 'left'}>
            {t('footer.copyright')}
          </TYPE.smallGray>
        </Box>
      </Container>
    </Box>
  )
}
