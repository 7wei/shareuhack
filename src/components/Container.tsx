import React from 'react'
import { Container as MuiContainer } from '@material-ui/core'

export default function Container({ children }: { children: JSX.Element }) {
  return <MuiContainer maxWidth="md">{children}</MuiContainer>
}
