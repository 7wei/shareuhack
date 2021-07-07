import Footer from './Footer'
import Meta from './Meta'
import Header from './Header'
import React from 'react'

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Meta />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
