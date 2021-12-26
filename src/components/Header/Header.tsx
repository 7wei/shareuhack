import { useCallback, useState } from 'react'
import { Box, AppBar, Toolbar, IconButton, Typography, useTheme } from '@mui/material'
import { NavLinks } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import LanguageSelector from 'components/LanguageSelector/LanguageSelector'
import useBreakpint from 'hooks/useBreakpoint'
import { Menu, Close } from '@mui/icons-material'
import dynamic from 'next/dynamic'
import Link from 'components/Link/Link'

const Drawer = dynamic(() => import('./Drawer'))

export default function Header() {
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const isDownMd = useBreakpint('md')
  const [openDrawer, setOpenDrawer] = useState(false)
  const theme = useTheme()

  const onClick = useCallback(() => {
    setOpenDrawer(false)
  }, [])

  return (
    <AppBar
      position="static"
      sx={{
        background: theme.palette.background.default,
        boxShadow: 'none',
        height: 140,
        paddingTop: 20,
        marginBottom: 15,
        [theme.breakpoints.down('sm')]: {
          paddingTop: 16,
          height: 80,
        },
      }}
    >
      <Toolbar sx={{ padding: 0 }}>
        <Box visibility={isDownMd ? 'visible' : 'hidden'}>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={() => setOpenDrawer(!openDrawer)}
            sx={{
              zIndex: 9999999,
              display: 'absolute',
            }}
          >
            {openDrawer ? <Close /> : <Menu />}
          </IconButton>
        </Box>

        <Box display="flex" alignItems="center" flexDirection={'column'} gap={0} flexGrow={1}>
          <Link href="/" locale={locale} color={theme.palette.text.primary}>
            <Typography fontSize={isDownMd ? 24 : 28} fontWeight={700} fontStyle="italic" component="div">
              Shareuhack
            </Typography>
          </Link>
          {!isDownMd && (
            <Typography color={theme.palette.text.secondary} fontStyle="italic" fontSize={16}>
              Hacks for the real life
            </Typography>
          )}
        </Box>
        <Box visibility={openDrawer ? 'hidden' : 'visible'}>
          <LanguageSelector />
        </Box>
      </Toolbar>
      {isDownMd ? (
        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} onClick={onClick} />
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" gap={24} mt={20} mb={15}>
          {NavLinks.map((link, idx) => (
            <Link key={idx} href={link.link}>
              <Box
                sx={{
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
                }}
              >
                {t(`categories.${link.key}.title`)}
              </Box>
            </Link>
          ))}
        </Box>
      )}
    </AppBar>
  )
}
