import React from 'react'
import { Container as MuiContainer } from '@mui/material'
import useBreakpoint from 'hooks/useBreakpoint'

export default function Container({ children }: { children: any }) {
  const isDownMd = useBreakpoint('md')

  return <MuiContainer maxWidth="md">{children}</MuiContainer>
}
