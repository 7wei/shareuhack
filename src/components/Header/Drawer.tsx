import React from 'react'
import { Drawer, Box, useTheme, Typography } from '@mui/material'
import { NavLinks } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import Link from 'components/Link/Link'
import { Close } from '@material-ui/icons'

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
            backgroundColor: theme.palette.primary.main,
            boxShadow: 'none',
          },
        }}
        open={open}
        onClose={onClose}
      >
        <Box display="flex" alignItems="center" justifyContent={'center'} flexDirection={'column'} paddingTop={'20px'}>
          <Typography fontSize={24} fontWeight={700} fontStyle="italic">
            Shareuhack
          </Typography>
          <Typography color={theme.palette.text.secondary} fontStyle="italic" fontSize={16}>
            Hacks for the real life
          </Typography>
        </Box>
        <Box padding="24px 30px" bgcolor={theme.palette.background.default} height="100%">
          <Typography fontSize={24} fontWeight={700} color={theme.palette.primary.main}>
            Explore
          </Typography>
          <Box mt="20px" pl="12px" display="flex" flexDirection="column" gap={15} height="calc(100% - 80px)">
            {NavLinks.map((link, idx) => (
              <Link key={idx} href={link.link} onClick={onClick}>
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
