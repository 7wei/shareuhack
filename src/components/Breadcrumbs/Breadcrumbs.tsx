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
        mt: 15,
        '& li': {
          '& a': { color: theme.textColor.text2 },
          '&:last-child a': { color: theme.textColor.text1 },
        },
      }}
    >
      {children}
    </MuiBreadcrumbs>
  )
}
