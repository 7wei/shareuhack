import { useCallback, useState, useEffect } from 'react'
import { Box, AppBar, Toolbar, IconButton, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import useBreakpint from 'hooks/useBreakpoint'
import dynamic from 'next/dynamic'
import Link from 'components/Link/Link'
import { Categories, Routes } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import BrandLogo from 'components/BrandLogo'
import { Menu, Close } from '@mui/icons-material'
// import LanguageSelector from 'components/LanguageSelector'

const Drawer = dynamic(() => import('./Drawer'))

export default function Header() {
  // const { locale } = useRouter()
  const isDownMd = useBreakpint('md')
  const [openDrawer, setOpenDrawer] = useState(false)
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

  return (
    <>
      {offset > 120 ? (
        <AppBar
          sx={{
            background: theme.palette.background.default,
            height: 32,
            boxShadow: 'none',
            borderBottom: `1px solid rgba(0,0,0,0.1)`,
            padding: {
              xs: '0px 20px !important',
              md: '0px 80px !important',
            },
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <BrandLogo width={isDownMd ? 80 : 100} />

          {!isDownMd && (
            <Box sx={{ display: 'flex', gap: 30, ml: 48, justifyContent: 'center', width: '100%' }}>
              {Categories.map((link) => (
                <Link
                  key={link.key}
                  href={link.link}
                  onClick={onClick}
                  title={'Shareuhack|' + t(`categories.${link.key}.title`)}
                  disableUnderline
                >
                  <Typography variant="body2" color={theme.palette.text.primary}>
                    {t(`categories.${link.key}.title`)}
                  </Typography>
                </Link>
              ))}
              <Link
                href={Routes.about}
                onClick={onClick}
                color={theme.palette.primary.contrastText}
                title={'Shareuhack|About Us'}
                disableUnderline
              >
                <Typography variant="body2" color={theme.palette.text.primary}>
                  {t('about')}
                </Typography>
              </Link>
            </Box>
          )}

          <IconButton color="primary" aria-label="Menu" onClick={() => setOpenDrawer(!openDrawer)}>
            {openDrawer && isDownMd ? <Close fontSize="small" /> : <Menu fontSize="small" />}
          </IconButton>
        </AppBar>
      ) : (
        <AppBar
          position="sticky"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
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
          <BrandLogo width={isDownMd ? 100 : 108} />
          {!isDownMd && (
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
              <Link
                href={Routes.about}
                onClick={onClick}
                color={theme.palette.primary.contrastText}
                title={'Shareuhack|About Us'}
                disableUnderline
              >
                <Typography variant="body1" color={theme.palette.text.primary}>
                  {t('about')}
                </Typography>
              </Link>
            </Box>
          )}
          {isDownMd && (
            <IconButton color="primary" aria-label="Menu" onClick={() => setOpenDrawer(!openDrawer)}>
              {openDrawer && isDownMd ? <Close fontSize="small" /> : <Menu fontSize="small" />}
            </IconButton>
          )}
        </AppBar>
      )}
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} onClick={onClick} />
    </>
  )
}
