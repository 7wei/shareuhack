import Footer from '../Footer/Footer'
import Meta from '../Meta'
import Header from '../Header/Header'
import React from 'react'
import { useTheme, Container } from '@mui/material'

export default function Layout({ children }: { children: JSX.Element }) {
  const theme = useTheme()
  return (
    <>
      <Meta />
      <Header />
      <Container maxWidth="md">{children}</Container>
      <Container maxWidth="md">
        <Footer />
      </Container>
    </>
  )
}
