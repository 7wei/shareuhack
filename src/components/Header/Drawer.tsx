import React from 'react'
import { Drawer, Box, useTheme, Typography } from '@mui/material'
import { NavLinks } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import Link from 'components/Link/Link'
import LanguageSelector from 'components/LanguageSelector/LanguageSelector'

interface Props {
  open: boolean
  onClose: () => void
  onClick: () => void
}

export default function DrawerComponent(props: Props) {
  const { open, onClose, onClick } = props
  const { t } = useTranslation('common')
  const theme = useTheme()

  return (
    <>
      <Drawer
        sx={{
          '& .MuiBackdrop-root': {
            boxShadow: 'none',
            backgroundColor: 'transparent',
          },
          '& .MuiPaper-root': {
            width: 'calc(100% - 1px)',
            backgroundColor: 'transparent',
            marginTop: 48,
          },
        }}
        open={open}
        onClose={onClose}
      >
        <Box padding="24px 30px" bgcolor={theme.palette.background.default} height="100%">
          <Typography fontSize={24} fontWeight={700} color={theme.palette.primary.main}>
            Explore
          </Typography>
          <Box mt="20px" pl="12px" display="flex" flexDirection="column" gap={15} height="calc(100% - 80px)">
            {NavLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.link}
                onClick={onClick}
                color={theme.palette.primary.contrastText}
                title={'Shareuhack|' + t(`categories.${link.key}.title`)}
              >
                <Typography fontSize={18} fontWeight={500}>
                  {t(`categories.${link.key}.title`)}
                </Typography>
              </Link>
            ))}
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
