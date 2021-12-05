import React from 'react'
import { Drawer, makeStyles, Box, useTheme } from '@material-ui/core'
import { NavLinks } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import Link from 'components/Link/Link'
import { TYPE } from 'theme/index'
import { Close } from '@material-ui/icons'

interface Props {
  open: boolean
  onClose: () => void
  onClick: () => void
}

const useStyles = makeStyles((theme) => ({
  root: {
    // boxShadow: 'none',
    '& .MuiBackdrop-root': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
  paper: {
    width: '100%',
    background: 'transparent',
  },
}))

export default function DrawerComponent(props: Props) {
  const { open, onClose, onClick } = props
  const classes = useStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()

  return (
    <>
      <Drawer classes={{ ...classes }} open={open} onClose={onClose} hideBackdrop={true}>
        <Box padding="24px 30px" mt="80px" bgcolor={theme.palette.background.default} height="100%">
          <TYPE.primary fontSize={24} fontWeight={700}>
            Explore
          </TYPE.primary>
          <Box mt="20px" pl="12px" display="flex" flexDirection="column" gridGap={15} height="calc(100% - 80px)">
            {NavLinks.map((link, idx) => (
              <Link key={idx} href={link.link} onClick={onClick}>
                <TYPE.header fontSize={18}>{t(`categories.${link.key}.title`)}</TYPE.header>
              </Link>
            ))}
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
