import React, { useCallback } from 'react'
import { Drawer, Box, useTheme, Typography, Button } from '@mui/material'
import { Categories, Routes } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import Link from 'components/Link/Link'
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
          width: 228,
          backgroundColor: theme.palette.background.default,
        },
      }}
      open={open}
      onClose={onClose}
      anchor="right"
    >
      <Box padding="48px 16px" bgcolor={theme.palette.background.default} flexDirection="column">
        <Box mb={24}>
          <Link
            href={Routes.home}
            locale={locale}
            onClick={onClick}
            color={theme.palette.primary.contrastText}
            title={'Home'}
            type="nav"
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
              title={t(`categories.${link.key}.title`)}
              type="nav"
            >
              <Typography variant="body1" color={theme.palette.text.primary}>
                {t(`categories.${link.key}.title`)}
              </Typography>
            </Link>
          ))}
        </Box>

        <Divider />
        <Box mt={16} mb={8}>
          <Link
            href={Routes.about}
            locale={locale}
            onClick={onClick}
            color={theme.palette.primary.contrastText}
            title={'About'}
            type="nav"
          >
            <Typography variant="body1" color={theme.palette.text.primary}>
              {t('about')}
            </Typography>
          </Link>
        </Box>

        <Socials primary size={'small'} />
      </Box>
    </Drawer>
  )
}
