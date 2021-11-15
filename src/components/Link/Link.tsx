import { makeStyles, Theme, Link as MuiLink } from '@material-ui/core'
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

const Link = React.forwardRef((props: Props, ref) => {
  const { href, target, children } = props
  const classes = useStyles()
  return (
    <MuiLink className={classes.link} href={href} target={target}>
      {children}
    </MuiLink>
  )
})

export default Link
