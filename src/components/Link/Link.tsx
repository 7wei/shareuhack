import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
// import theme from '../../theme/index'

interface Props {
  href?: string
  target?: string
  children: React.ReactNode
  noFollow?: boolean
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
  const { href, target, children, noFollow } = props
  const classes = useStyles()
  return (
    <a className={classes.link} href={href} target={target} rel={noFollow ? 'nofollow' : ''}>
      {children}
    </a>
  )
})

export default Link
