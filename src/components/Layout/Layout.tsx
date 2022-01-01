import Footer from '../Footer/Footer'
import Meta from '../Meta'
import Header from '../Header/Header'
import React from 'react'
import { useTheme, Container, Box } from '@mui/material'

export default function Layout({ children }: { children: JSX.Element }) {
  const theme = useTheme()
  return (
    <>
      <Meta />
      <Header />
      <Container maxWidth="md" sx={{ padding: { xs: '0 15px', md: 0 } }}>
        <Box paddingTop={15}>{children}</Box>
      </Container>
      <Container maxWidth="md">
        <Footer />
      </Container>
    </>
  )
}
