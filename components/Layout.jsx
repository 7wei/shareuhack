import Alert from './Alert'
import Footer from './Footer'
import Meta from './Meta'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      {/* <Alert preview={preview} /> */}
      <main>{children}</main>
      <Footer />
    </>
  )
}
