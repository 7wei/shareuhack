import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
// import theme from '../../theme/index'

interface Props {
  href?: string
  target?: string
  children: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.dark,
      textDecoration: 'none',
    },
  },
}))

export default function Link(props: Props) {
  const { href, target, children } = props
  const classes = useStyles()
  return (
    <a className={classes.link} href={href} target={target}>
      {children}
    </a>
  )
}
