import { useCallback, useState } from 'react'
import { Box, AppBar, Toolbar, IconButton, Container, useTheme } from '@mui/material'
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
        height: theme.height.header,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            background: theme.palette.background.default,
            boxShadow: 'none',
            minHeight: theme.height.header,
            padding: '15px 15px',
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: theme.palette.text.secondary,
          }}
        >
          <Link href="/" locale={locale} color={theme.palette.text.primary} title="Shareuhack|Home">
            <Image src="/assets/brand/logo.svg" width={86} height={58.5} />
          </Link>
          <IconButton sx={{ zIndex: 9 }} color="primary" aria-label="Menu" onClick={() => setOpenDrawer(!openDrawer)}>
            {openDrawer && isDownMd ? <Close fontSize="small" /> : <Menu fontSize="small" />}
          </IconButton>
        </Toolbar>
      </Container>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} onClick={onClick} />
    </AppBar>
  )
}
