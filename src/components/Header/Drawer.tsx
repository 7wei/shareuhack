import React from 'react'
import { Drawer, Box, useTheme, Typography } from '@mui/material'
import { Categories, Routes } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import Link from 'components/Link/Link'
import LanguageSelector from 'components/LanguageSelector/LanguageSelector'
import Divider from 'components/Divider/Divider'
import { useRouter } from 'next/router'
import Socials from 'components/Socials/Socials'

interface Props {
  open: boolean
  onClose: () => void
  onClick: () => void
}

export default function DrawerComponent(props: Props) {
  const { open, onClose, onClick } = props
  const { t } = useTranslation('common')
  const theme = useTheme()
  const { locale } = useRouter()

  return (
    <Drawer
      sx={{
        '& .MuiBackdrop-root': {
          boxShadow: 'none',
          backgroundColor: 'transparent',
        },
        '& .MuiPaper-root': {
          width: 180,
          backgroundColor: theme.palette.background.default,
        },
      }}
      open={open}
      onClose={onClose}
    >
      <Box padding="18px 24px" bgcolor={theme.palette.background.default}>
        <Box mt="20px" pl="12px" display="flex" flexDirection="column" gap={12} height="calc(100% - 80px)">
          <Link
            href={Routes.about}
            locale={locale}
            onClick={onClick}
            color={theme.palette.primary.contrastText}
            title={'Shareuhack|Home'}
          >
            <Typography variant="body1" color={theme.palette.text.primary}>
              {t('home')}
            </Typography>
          </Link>
          <Divider primary />
          {Categories.map((link, idx) => (
            <Link
              key={idx}
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
          <Divider primary />
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
          <Socials primary />
        </Box>
      </Box>
    </Drawer>
  )
}
