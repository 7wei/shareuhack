import Footer from './Footer'
import Meta from './Meta'
import Header from './Header'
import React from 'react'
import Container from './Container/Container'

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Meta />
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  )
}
