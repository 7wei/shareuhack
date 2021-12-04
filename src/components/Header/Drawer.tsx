import React, { useCallback } from 'react'
import { Drawer, makeStyles, Box, ListItem, Typography } from '@material-ui/core'
import { NavLinks } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface Props {
  open: boolean
  onClose: () => void
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
    marginTop: 56,
    background: theme.palette.background.default,
  },
}))

export default function DrawerComponent(props: Props) {
  const { open, onClose } = props
  const classes = useStyles()
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <>
      <Drawer classes={{ ...classes }} open={open} onClose={onClose}>
        <Box display="flex" flexDirection="column" gridGap={20} padding="40px">
          {NavLinks.map((link, idx) => (
            <Link key={`menu-category-${link.key}`} href={link.link} passHref>
              {t(`categories.${link.key}.title`)}
            </Link>
          ))}
        </Box>
      </Drawer>
    </>
  )
}
