import React from 'react'
import { Container as MuiContainer } from '@mui/material'

export default function Container({ children }: { children: any }) {
  return <MuiContainer sx={{ maxWidth: 1048 }}>{children}</MuiContainer>
}
