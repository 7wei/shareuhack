import { Paper } from '@mui/material'
import React from 'react'

export default function Card({
  children,
  color,
  padding,
  width,
  style,
  outlined,
}: {
  children: JSX.Element | React.ReactNode
  color?: string
  padding?: string | number
  width?: string | number
  style?: React.CSSProperties
  outlined?: boolean
}) {
  return (
    <Paper
      variant={outlined ? 'outlined' : 'elevation'}
      sx={{
        backgroundColor: 'transparent',
        border: `1px solid ${color ?? 'rgba(0, 0, 0, 0.1)'}`,
        padding,
        width,
        ...style,
      }}
    >
      {children}
    </Paper>
  )
}
