import { Breadcrumbs as MuiBreadcrumbs, useTheme } from '@mui/material'
import React from 'react'

interface Props {
  children?: React.ReactNode
}

export default function Breadcrumbs(props: Props) {
  const theme = useTheme()
  const { children } = props
  return (
    <MuiBreadcrumbs
      sx={{
        '& li': {
          '& a': { color: theme.palette.text.secondary },
          '&:last-child a': { color: theme.palette.text.primary, fontWeight: 500 },
        },
      }}
    >
      {children}
    </MuiBreadcrumbs>
  )
}
