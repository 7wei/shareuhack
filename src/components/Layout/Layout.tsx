import Footer from '../Footer/Footer'
import Meta from '../Meta'
import Header from '../Header/Header'
import React from 'react'
import Container from '../Container/Container'

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Meta />
      <Container>
        <Header />
        {children}
      </Container>
      <Footer />
    </>
  )
}
