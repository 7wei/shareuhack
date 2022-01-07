import { useCallback, useState } from 'react'
import { Box, AppBar, Toolbar, IconButton, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import useBreakpint from 'hooks/useBreakpoint'
import { Menu, Close } from '@mui/icons-material'
import dynamic from 'next/dynamic'
import Link from 'components/Link/Link'
import Image from 'next/image'
import { Categories } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'

const Drawer = dynamic(() => import('./Drawer'))

export default function Header() {
  const { locale } = useRouter()
  const isDownMd = useBreakpint('md')
  const [openDrawer, setOpenDrawer] = useState(false)
  const theme = useTheme()
  const { t } = useTranslation('common')

  const onClick = useCallback(() => {
    setOpenDrawer(false)
  }, [])

  return (
    <AppBar
      position="sticky"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        background: theme.palette.background.default,
        boxShadow: 'none',
        height: {
          xs: theme.height.mobileHeader,
          md: theme.height.header,
        },
        borderBottom: `1px solid rgba(0,0,0,0.1)`,
        overflow: 'hidden',
        padding: {
          xs: '0px 20px !important',
          md: '0px 80px !important',
        },
      }}
    >
      <Link href="/" locale={locale} title="Shareuhack|Home">
        <Box
          sx={{
            width: {
              xs: 100,
              md: 144,
            },
            height: 48,
            position: 'relative',
          }}
        >
          <Image
            title="shareuhack brand logo"
            aria-label="shareuhack brand logo"
            src={'/assets/brand/shareuhack2.svg'}
            alt="shareuhack brand logo"
            layout="fill"
          />
        </Box>
      </Link>
      <Box sx={{ flexGrow: 1, display: 'flex', gap: 30, ml: 48 }}>
        {Categories.map((link) => (
          <Link
            key={link.key}
            href={link.link}
            onClick={onClick}
            title={'Shareuhack|' + t(`categories.${link.key}.title`)}
            disableUnderline
          >
            <Typography variant="body1" color={theme.palette.text.primary}>
              {t(`categories.${link.key}.title`)}
            </Typography>
          </Link>
        ))}
      </Box>
      {/* <Toolbar
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
          padding: {
            xs: '0px 20px !important',
            md: '0px 80px !important',
          },
        }}
      >
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {Categories.map((link) => (
            <Link
              key={link.key}
              href={link.link}
              onClick={onClick}
              color={theme.palette.primary.contrastText}
              title={'Shareuhack|' + t(`categories.${link.key}.title`)}
            >
              <Typography variant="body1" color={theme.palette.text.primary}>
                {t(`categories.${link.key}.title`)}
              </Typography>
            </Link>
          ))}
        </Box>

        <IconButton color="primary" aria-label="Menu" onClick={() => setOpenDrawer(!openDrawer)}>
          {openDrawer && isDownMd ? <Close fontSize="small" /> : <Menu fontSize="small" />}
        </IconButton>
      </Toolbar> */}
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} onClick={onClick} />
    </AppBar>
  )
}
