import { useCallback, useState } from 'react'
import { Box, AppBar, Toolbar, IconButton, Container, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import useBreakpint from 'hooks/useBreakpoint'
import { Menu, Close } from '@mui/icons-material'
import dynamic from 'next/dynamic'
import Link from 'components/Link/Link'
import Image from 'next/image'

const Drawer = dynamic(() => import('./Drawer'))

export default function Header() {
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
        height: {
          xs: theme.height.mobileHeader,
          md: theme.height.header,
        },
        borderBottom: `1px solid rgba(0,0,0,0.1)`,
        overflow: 'hidden',
        padding: '0 15px',
      }}
    >
      <Container maxWidth="md">
        <Toolbar
          sx={{
            background: theme.palette.background.default,
            boxShadow: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: theme.palette.text.secondary,
            height: {
              xs: theme.height.mobileHeader,
              md: theme.height.header,
            },
            minHeight: {
              xs: theme.height.mobileHeader,
              md: theme.height.header,
            },
            padding: '0px !important',
          }}
        >
          <Link href="/" locale={locale} title="Shareuhack|Home">
            <Box
              sx={{
                backgroundImage: {
                  xs: 'url(/assets/brand/logo2.svg)',
                  md: 'none',
                },
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: 72,
                height: 48,
              }}
            >
              <Box sx={{ visibility: { xs: 'hidden', md: 'visible' } }}>
                <Image
                  title="shareuhack brand logo"
                  aria-label="shareuhack brand logo"
                  src={'/assets/brand/logo1.svg'}
                  alt="shareuhack brand logo"
                  width={72}
                  height={48}
                />
              </Box>
            </Box>
          </Link>

          <IconButton color="primary" aria-label="Menu" onClick={() => setOpenDrawer(!openDrawer)}>
            {openDrawer && isDownMd ? <Close fontSize="small" /> : <Menu fontSize="small" />}
          </IconButton>
        </Toolbar>
      </Container>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} onClick={onClick} />
    </AppBar>
  )
}
