import Link from 'components/Link/Link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'

export default function BrandLogo({ width }: { width: string | number }) {
  const { locale } = useRouter()
  return (
    <Box width={width} height="100%" position="relative">
      <Link href="/" locale={locale} title="Shareuhack|Home">
        <Image
          title="shareuhack brand logo"
          aria-label="shareuhack brand logo"
          src={'/assets/brand/shareuhack2.svg'}
          alt="shareuhack brand logo"
          layout="fill"
        />
      </Link>
    </Box>
  )
}
