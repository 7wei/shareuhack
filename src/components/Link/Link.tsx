import React from 'react'
import NextLink from 'next/link'
import { makeStyles, Theme, Link as MuiLink } from '@material-ui/core'

interface Props {
  href: string
  target?: string
  children: React.ReactNode
  rel?: string
  color?: string
  locale?: string
  onClick?: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    color: (props: Props) => (props.color ? props.color : theme.palette.primary.main),
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
  },
}))

export default function Link(props: Props) {
  const { href, target, children, rel, locale, onClick } = props
  const classes = useStyles(props)

  return (
    <NextLink href={href} locale={locale} passHref>
      <MuiLink className={classes.link} target={target} rel={rel} onClick={onClick}>
        {children}
      </MuiLink>
    </NextLink>
  )
}
