import { useCallback, useState, useEffect, useMemo } from 'react'
import { Box, AppBar, IconButton, Typography, useTheme } from '@mui/material'
import useBreakpint from 'hooks/useBreakpoint'
import dynamic from 'next/dynamic'
import Link from 'components/Link/Link'
import { Categories, Routes } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import BrandLogo from 'components/BrandLogo'
import { Menu, Close } from '@mui/icons-material'
import { useAmp } from 'next/amp'
import LanguageSelector from 'components/LanguageSelector'

const Drawer = dynamic(() => import('./Drawer'))

export default function Header() {
  const isDownMd = useBreakpint('md')
  const [openDrawer, setOpenDrawer] = useState(false)
  const isAmp = useAmp()
  const theme = useTheme()
  const { t } = useTranslation('common')

  const onClick = useCallback(() => {
    setOpenDrawer(false)
  }, [])

  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setOffset(window.pageYOffset)
    }
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (isAmp) {
    return (
      <header>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '60px',
          }}
        >
          <BrandLogo width={isDownMd ? 80 : 100} />
        </div>
      </header>
    )
  }

  const navs = useMemo(() => {
    const categories = Categories.map((category) => {
      return {
        key: category.key,
        title: t(`categories.${category.key}.title`),
        url: category.link,
      }
    })
    const instahack = {
      key: 'instahack',
      title: 'InstaHack',
      url: Routes.instahack,
    }
    const about = {
      key: 'about',
      title: t('about'),
      url: Routes.about,
    }
    const crypto = {
      key: 'crypto',
      title: t('crypto'),
      url: Routes.crypto,
    }

    return [...categories, crypto, instahack, about]
  }, [])

  return (
    <>
      <StyledAppBar onClick={() => setOpenDrawer(!openDrawer)} openDrawer={openDrawer} />
      {!isDownMd && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 30,
            height: 36,
          }}
        >
          {navs.map((nav) => (
            <Link
              key={nav.key}
              href={nav.url}
              onClick={onClick}
              title={nav.title}
              disableUnderline
              type="nav"
              color={theme.palette.text.primary}
              fontSize={12}
            >
              {nav.title}
            </Link>
          ))}
        </Box>
      )}

      {offset > 150 && (
        <StyledAppBar
          onClick={() => setOpenDrawer(!openDrawer)}
          showLinks
          sticky
          openDrawer={openDrawer}
          height={32}
          navs={navs}
          shadow
        />
      )}
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} onClick={onClick} />
    </>
  )
}

function StyledAppBar({
  onClick,
  height,
  openDrawer,
  showLinks,
  sticky,
  navs,
  shadow,
}: {
  onClick: () => void
  height?: number
  openDrawer: boolean
  showLinks?: boolean
  sticky?: boolean
  shadow?: boolean
  navs?: { key: string; title: string; url: string }[]
}) {
  const theme = useTheme()
  const isDownMd = useBreakpint('md')

  return (
    <AppBar
      position={sticky ? 'sticky' : 'static'}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        background: theme.palette.background.default,
        boxShadow: shadow ? '0 0 5px 1px rgb(0 0 0 / 28%)' : 'none',
        height: {
          xs: height ?? theme.height.mobileHeader,
          md: height ?? theme.height.header,
        },
        borderBottom: `1px solid rgba(0,0,0,0.1)`,
        overflow: 'hidden',
        padding: {
          xs: '0px 20px !important',
          md: '0px 80px !important',
        },
        transition: 'transition: top 1.5s ease-out;',
      }}
    >
      <BrandLogo width={isDownMd ? 100 : 120} />
      <LanguageSelector />
      <IconButton
        sx={{
          right: {
            xs: 20,
            md: 80,
          },
          position: 'absolute',
        }}
        color="primary"
        aria-label="Menu"
        onClick={onClick}
      >
        {openDrawer ? <Close fontSize="small" /> : <Menu fontSize="small" />}
      </IconButton>
      {showLinks && navs && (
        <Box
          sx={{
            flexGrow: 1,
            gap: 30,
            ml: 48,
            display: {
              xs: 'none',
              md: 'flex',
            },
            transition: '0.5s',
          }}
        >
          {navs.map((nav) => (
            <Link
              key={nav.key}
              href={nav.url}
              onClick={onClick}
              title={nav.title}
              disableUnderline
              type="nav"
              color={theme.palette.text.primary}
              fontSize={12}
            >
              {nav.title}
            </Link>
          ))}
        </Box>
      )}
    </AppBar>
  )
}
