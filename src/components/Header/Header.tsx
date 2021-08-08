import { makeStyles, Box } from '@material-ui/core'
import Link from 'next/link'
import Container from '../Container/Container'
import theme, { TYPE } from 'theme/index'
import { NavLinks, Routes } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

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
})

export default function Header() {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { locale } = useRouter()

  return (
    <div className={classes.root}>
      <Container>
        <Link href="/" locale={locale} passHref>
          <TYPE.brand textAlign="center">Shareuhack</TYPE.brand>
        </Link>

        <Box display="flex" height="80px" alignItems="center" justifyContent="center" gridColumnGap="16px">
          {NavLinks.map((link) => (
            <Link key={link.key} href={link.link} passHref>
              <a className={classes.navlink}>{t(`${link.key}`).toUpperCase()}</a>
            </Link>
          ))}
        </Box>
      </Container>
    </div>
  )
}
