import { useState } from 'react'
import { makeStyles, Box, Typography, AppBar, Toolbar, IconButton, Drawer } from '@material-ui/core'
import Link from 'next/link'
import Container from '../Container/Container'
import theme, { TYPE } from 'theme/index'
import { NavLinks, Routes } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import LanguageSelector from 'components/LanguageSelector/LanguageSelector'
import useBreakpint from 'hooks/useBreakpoint'
import { Menu, Close } from '@material-ui/icons'
import { SettingsInputComponent } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    // height: 260,
    // paddingTop: 30,
  },
  appbar: { background: theme.palette.background.default, boxShadow: 'none' },
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
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbar: {
    padding: 0,
  },
  drawer: {
    width: '100%',
    position: 'absolute',
    top: 60,
  },
  drawerPaper: {
    width: '100%',
  },
  // drawerContainer: {
  //   overflow: 'auto',
  // },
}))

export default function Header() {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const { matches } = useBreakpint()
  const [open, setOpen] = useState(false)

  return (
    <Container>
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
            {matches && (
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={() => setOpen(!open)}
              >
                {open ? <Close /> : <Menu />}
              </IconButton>
            )}

            <Box
              className={classes.brand}
              display="flex"
              alignItems="center"
              justifyContent={matches ? 'center' : 'flex-start'}
            >
              <Link href="/" locale={locale} passHref>
                <TYPE.header fontSize={matches ? 24 : 36} fontWeight={700} fontStyle="italic">
                  Shareuhack
                </TYPE.header>
              </Link>
              {!matches && (
                <TYPE.smallGray fontStyle="italic" ml={16} fontSize={16}>
                  Hacks for the real life
                </TYPE.smallGray>
              )}
            </Box>
            <LanguageSelector />
          </Toolbar>
          {!matches && (
            <Box display="flex" height="48px" mb="16px" alignItems="center" justifyContent="center" gridGap={16}>
              {NavLinks.map((link, idx) => (
                <Link key={idx} href={link.link} passHref>
                  <a id={`nav-category-${link.key}`} className={classes.navlink}>
                    {t(`categories.${link.key}.title`)}
                  </a>
                </Link>
              ))}
            </Box>
          )}
        </AppBar>
        {matches && open && (
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}></div>
          </Drawer>
        )}
      </div>
    </Container>
  )
}
