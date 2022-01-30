import { useCallback, useState, useEffect } from 'react'
import { Box, AppBar, IconButton, Typography, useTheme } from '@mui/material'
import useBreakpint from 'hooks/useBreakpoint'
import dynamic from 'next/dynamic'
import Link from 'components/Link/Link'
import { Categories, Routes } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import BrandLogo from 'components/BrandLogo'
import { Menu, Close } from '@mui/icons-material'
import { useAmp } from 'next/amp'

const Drawer = dynamic(() => import('./Drawer'))

export default function Header() {
  const isDownMd = useBreakpint('md')
  const [openDrawer, setOpenDrawer] = useState(false)
  const isAmp = useAmp()

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

  return (
    <>
      <StyledAppBar onClick={() => setOpenDrawer(!openDrawer)} openDrawer={openDrawer} slogan />
      {offset > 150 && (
        <StyledAppBar onClick={() => setOpenDrawer(!openDrawer)} showLinks sticky openDrawer={openDrawer} height={32} />
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
  slogan,
}: {
  onClick: () => void
  height?: number
  openDrawer: boolean
  showLinks?: boolean
  sticky?: boolean
  slogan?: boolean
}) {
  const theme = useTheme()
  const isDownMd = useBreakpint('md')
  const { t } = useTranslation('common')

  return (
    <AppBar
      position={sticky ? 'sticky' : 'static'}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        background: theme.palette.background.default,
        boxShadow: 'none',
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

      <IconButton
        sx={{ display: isDownMd ? 'block' : 'none', marginLeft: 'auto' }}
        color="primary"
        aria-label="Menu"
        onClick={onClick}
      >
        {openDrawer ? <Close fontSize="small" /> : <Menu fontSize="small" />}
      </IconButton>
      {showLinks && (
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
          {Categories.map((link) => (
            <Link
              key={link.key}
              href={link.link}
              onClick={onClick}
              title={t(`categories.${link.key}.title`)}
              disableUnderline
              type="nav"
            >
              <Typography variant="body1" color={theme.palette.text.primary}>
                {t(`categories.${link.key}.title`)}
              </Typography>
            </Link>
          ))}
          <Link
            href={Routes.about}
            onClick={onClick}
            color={theme.palette.primary.contrastText}
            title={'About'}
            disableUnderline
            type="nav"
          >
            <Typography variant="body1" color={theme.palette.text.primary}>
              {t('about')}
            </Typography>
          </Link>
        </Box>
      )}
    </AppBar>
  )
}
