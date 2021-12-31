import { useCallback, useState } from 'react'
import { Box, AppBar, Toolbar, IconButton, Typography, useTheme } from '@mui/material'
import { NavLinks } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import useBreakpint from 'hooks/useBreakpoint'
import { Menu, Close } from '@mui/icons-material'
import dynamic from 'next/dynamic'
import Link from 'components/Link/Link'
import Image from 'next/image'

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
      position="sticky"
      sx={{
        background: theme.palette.background.default,
        boxShadow: 'none',
        height: 48,
      }}
    >
      <Toolbar>
        <IconButton
          color="primary"
          aria-label="Menu"
          onClick={() => setOpenDrawer(!openDrawer)}
          sx={{
            zIndex: 9,
            display: 'absolute',
          }}
        >
          {openDrawer ? <Close /> : <Menu />}
        </IconButton>

        <Box
          sx={{
            position: 'absolute',
            margin: '0 auto',
            left: 0,
            right: 0,
            textAlign: 'center',
          }}
        >
          <Link href="/" locale={locale} color={theme.palette.text.primary} title="Shareuhack|Home">
            <Image src="/assets/brand/shareuhack.svg" width={114.3} height={20} />
          </Link>
        </Box>
      </Toolbar>

      {isDownMd ? (
        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} onClick={onClick} />
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" gap={24} mt={20} mb={15}>
          {NavLinks.map((link, idx) => (
            <Link key={idx} href={link.link} disableUnderline title={'Shareuhack|' + t(`categories.${link.key}.title`)}>
              <Box
                sx={{
                  fontSize: 16,
                  textDecoration: 'none',
                  color: theme.palette.text.primary,
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
