import Footer from '../Footer/Footer'
import Meta from '../Meta'
import Header from '../Header/Header'
import React from 'react'
import Container from '../Container/Container'
import { Box, useTheme } from '@mui/material'

export default function Layout({ children }: { children: JSX.Element }) {
  const theme = useTheme()
  return (
    <>
      <Meta />
      <Container>
        <Header />
        <Box mt={theme.height.header}>{children}</Box>
      </Container>
      <Footer />
    </>
  )
}
