import React from 'react'
import NextLink from 'next/link'
import { Link as MuiLink, useTheme } from '@mui/material'

interface Props {
  href: string
  target?: string
  children: React.ReactNode
  rel?: string
  color?: string
  locale?: string
  onClick?: () => void
}

export default function Link(props: Props) {
  const { href, target, children, rel, locale, onClick, color } = props
  const theme = useTheme()

  return (
    <NextLink href={href} locale={locale} passHref>
      <MuiLink
        target={target}
        rel={rel}
        onClick={onClick}
        sx={{
          color: color || theme.palette.primary.main,
          textDecoration: 'none',
          // '&:hover': {
          //   color: theme.palette.primary.main,
          //   textDecoration: 'none',
          // },
        }}
      >
        {children}
      </MuiLink>
    </NextLink>
  )
}
