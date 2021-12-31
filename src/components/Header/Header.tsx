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
      <Toolbar
        sx={{
          background: theme.palette.background.default,
          boxShadow: 'none',
          height: 48,
        }}
      >
        <IconButton sx={{ zIndex: 9 }} color="primary" aria-label="Menu" onClick={() => setOpenDrawer(!openDrawer)}>
          {openDrawer && isDownMd ? <Close fontSize="small" /> : <Menu fontSize="small" />}
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

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} onClick={onClick} />
    </AppBar>
  )
}
