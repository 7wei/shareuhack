import { useCallback, useState } from 'react'
import { makeStyles, Box, Typography, AppBar, Toolbar, IconButton } from '@material-ui/core'
import theme, { TYPE } from 'theme/index'
import { NavLinks, Routes } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import LanguageSelector from 'components/LanguageSelector/LanguageSelector'
import useBreakpint from 'hooks/useBreakpoint'
import { Menu, Close } from '@material-ui/icons'
import Drawer from './Drawer'
import Link from 'components/Link/Link'

const useStyles = makeStyles((theme) => ({
  root: {
    // height: 260,
    // paddingTop: 30,
  },
  appbar: {
    background: theme.palette.background.default,
    boxShadow: 'none',
    height: 140,
    paddingTop: 20,
    marginBottom: 15,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 16,
      height: 80,
    },
  },
  navlink: {
    fontSize: 16,
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
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
    flexGrow: 1,
  },
  menuButton: {},
  toolbar: {
    padding: 0,
  },
}))

export default function Header() {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const { matches } = useBreakpint()
  const [openDrawer, setOpenDrawer] = useState(false)

  const onClick = useCallback(() => {
    setOpenDrawer(false)
  }, [])

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          {matches && (
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              {openDrawer ? <Close /> : <Menu />}
            </IconButton>
          )}

          <Box
            className={classes.brand}
            display="flex"
            alignItems="center"
            justifyContent={matches ? 'center' : 'flex-start'}
            flexDirection={matches ? 'column' : 'row'}
          >
            <Link href="/" locale={locale}>
              <TYPE.header fontSize={matches ? 24 : 36} fontWeight={700} fontStyle="italic">
                Shareuhack
              </TYPE.header>
            </Link>
            <TYPE.smallGray fontStyle="italic" ml={matches ? 0 : 16} fontSize={16} mt={matches ? 0 : 14}>
              Hacks for the real life
            </TYPE.smallGray>
          </Box>
          <LanguageSelector />
        </Toolbar>
        {matches ? (
          <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} onClick={onClick} />
        ) : (
          <Box display="flex" alignItems="center" justifyContent="center" gridGap={24} mt="18px">
            {NavLinks.map((link, idx) => (
              <Link key={idx} href={link.link}>
                <div className={classes.navlink}>{t(`categories.${link.key}.title`)}</div>
              </Link>
            ))}
          </Box>
        )}
      </AppBar>
    </div>
  )
}
