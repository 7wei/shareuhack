import Link from 'components/Link/Link'
import Image from 'components/Image'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import { useAmp } from 'next/amp'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}
export default function BrandLogo({ width }: { width: string | number }) {
  const { locale } = useRouter()
  const isAmp = useAmp()

  if (isAmp) {
    return (
      <div style={{ width: width, height: '60px' }}>
        <a href="/">
          <amp-img
            title="shareuhack brand logo"
            src={'/assets/brand/shareuhack2.svg'}
            alt="shareuhack brand logo"
            width={width}
            height={'60px'}
          />
        </a>
      </div>
    )
  }

  return (
    <Box width={width} height="100%" position="relative">
      <Link href="/" locale={locale} title="Home" type="nav">
        <Box position="relative" height="100%">
          <Image
            title="shareuhack brand logo"
            aria-label="shareuhack brand logo"
            src={'/assets/brand/shareuhack2.svg'}
            alt="shareuhack brand logo"
            layout="fill"
          />
        </Box>
      </Link>
    </Box>
  )
}
