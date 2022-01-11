import React, { useCallback } from 'react'
import { Drawer, Box, useTheme, Typography, Button } from '@mui/material'
import { Categories, Routes } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import Link from 'components/Link/Link'
import Divider from 'components/Divider/Divider'
import { useRouter } from 'next/router'
import Socials from 'components/Socials/Socials'
import { Locales } from '../../../lib/constants'

interface Props {
  open: boolean
  onClose: () => void
  onClick: () => void
}

export default function DrawerComponent(props: Props) {
  const { open, onClose, onClick } = props
  const { t } = useTranslation('common')
  const theme = useTheme()
  const { locale, locales } = useRouter()
  const router = useRouter()

  const getLocaleData = useCallback(
    (locale?: string) => {
      return Locales.find((el) => el.key === locale) || Locales[0]
    },
    [locale]
  )

  // const setLocale = useCallback(
  //   (locale: string) => {
  //     document.cookie = `NEXT_LOCALE=${locale}; expires=Fri, 31 Dec 9999 23:59:59 GMT`
  //     router.push(router.asPath, router.asPath, { locale: locale })
  //   },
  //   [locale, router.asPath]
  // )

  return (
    <Drawer
      sx={{
        '& .MuiBackdrop-root': {
          boxShadow: 'none',
          backgroundColor: 'transparent',
        },
        '& .MuiPaper-root': {
          width: 228,
          backgroundColor: theme.palette.background.default,
        },
      }}
      open={open}
      onClose={onClose}
      anchor="right"
    >
      <Box padding="48px 16px" bgcolor={theme.palette.background.default} flexDirection="column">
        {/* <Box pl="12px" display="flex" flexDirection="column" gap={12}> */}
        <Box mb={24}>
          <Link
            href={Routes.home}
            locale={locale}
            onClick={onClick}
            color={theme.palette.primary.contrastText}
            title={'Shareuhack|Home'}
          >
            <Typography variant="body1" color={theme.palette.text.primary}>
              {t('home')}
            </Typography>
          </Link>
        </Box>

        <Divider />

        <Box mt={16} mb={24} display="flex" flexDirection="column" gap="14px">
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

        {/* <Divider /> */}
        {/* <Box mt={16} mb={24}> */}
        {/* <Typography variant="body2" color={theme.palette.text.primary}>
            {t('selectLocale')}
          </Typography> */}
        {/* <Box display="flex" flexDirection="column" alignItems="flex-start" mt={16} gap={14}>
            {locales?.map((loc) => (
              <Typography variant="body2" key={loc}>
                <Link
                  href={router.asPath}
                  locale={loc}
                  onClick={onClick}
                  color={locale === loc ? theme.palette.primary.main : theme.palette.text.primary}
                  title={'Shareuhack|' + `${getLocaleData(loc).language}`}
                  disableUnderline
                >
                  {getLocaleData(loc).language}
                </Link>
              </Typography>
            ))}
          </Box> */}
        {/* </Box> */}
        <Divider />
        <Box mt={16}>
          <Link
            href={Routes.about}
            locale={locale}
            onClick={onClick}
            color={theme.palette.primary.contrastText}
            title={'Shareuhack|About Us'}
          >
            <Typography variant="body1" color={theme.palette.text.primary}>
              {t('about')}
            </Typography>
          </Link>
        </Box>

        <Socials />
      </Box>
      {/* </Box> */}
    </Drawer>
  )
}
