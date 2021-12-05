import React from 'react'
import { Drawer, makeStyles, Box } from '@material-ui/core'
import { NavLinks } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import Link from 'components/Link/Link'
import { TYPE } from 'theme/index'

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
    marginTop: 80,
    background: theme.palette.background.default,
  },
}))

export default function DrawerComponent(props: Props) {
  const { open, onClose, onClick } = props
  const classes = useStyles()
  const { t } = useTranslation('common')

  return (
    <>
      <Drawer classes={{ ...classes }} open={open} onClose={onClose}>
        <Box padding="24px 30px">
          <TYPE.primary fontSize={24} fontWeight={700}>
            Explore
          </TYPE.primary>
          <Box mt="20px" pl="12px" display="flex" flexDirection="column" gridGap={15}>
            {NavLinks.map((link, idx) => (
              <Link key={idx} href={link.link} onClick={onClick}>
                <TYPE.header>{t(`categories.${link.key}.title`)}</TYPE.header>
              </Link>
            ))}
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
