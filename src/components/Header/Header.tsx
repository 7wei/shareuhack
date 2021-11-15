import { makeStyles, Box } from '@material-ui/core'
import Link from 'next/link'
import Container from '../Container/Container'
import theme, { TYPE } from 'theme/index'
import { NavLinks, Routes } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import LanguageSelector from 'components/LanguageSelector/LanguageSelector'
import useBreakpint from 'hooks/useBreakpoint'

const useStyles = makeStyles({
  root: {
    // height: 260,
    paddingTop: 30,
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
  brand: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 700,
    color: theme.textColor.text1,
    cursor: 'pointer',
  },
})

export default function Header() {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const { matches } = useBreakpint()

  return (
    <div className={classes.root}>
      <Container>
        {!matches && (
          <Box position="relative">
            <Box right={0} position="absolute">
              <LanguageSelector />
            </Box>
          </Box>
        )}

        <Link href="/" locale={locale} passHref>
          <div className={classes.brand}>Shareuhack</div>
        </Link>
        <Box display="flex" justifyContent="center">
          {matches && <LanguageSelector />}
        </Box>
        <Box display="flex" height="80px" alignItems="center" justifyContent="center">
          {NavLinks.map((link, idx) => (
            <Box key={idx} margin="0 8px">
              <Link key={link.key} href={link.link} passHref>
                <a id={`nav-category-${link.key}`} className={classes.navlink}>
                  {t(`${link.key}`).toUpperCase()}
                </a>
              </Link>
            </Box>
          ))}
        </Box>
      </Container>
    </div>
  )
}
