import { Box, Typography } from '@mui/material'
import Link from 'components/Link/Link'
import Image from 'components/Image'
import Carousel from 'components/Carousel'
import InstagramIcon from '@mui/icons-material/Instagram'
import useBreakpoint from 'hooks/useBreakpoint'

export default function InstaPost({
  instagramUrl,
  title,
  slideUrls,
  width,
}: {
  instagramUrl: string
  title: string
  slideUrls: string[]
  width: string | number
}) {
  const isDownMd = useBreakpoint('md')

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: width || 360,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          zIndex: 1,
          top: 12,
        }}
      >
        <Link href={instagramUrl} title={`Instagram-${title}`} target="_blank" type="external" color="#000000">
          <Box width="103px" height="29px" position="relative">
            <Image
              src="/assets/icons/instagram.png"
              layout="fill"
              alt={'instagram-shareuhack'}
              title={'instagram-shareuhack'}
            />
          </Box>
        </Link>
      </Box>
      <Carousel urls={slideUrls} size={isDownMd ? 360 : 480} />
      <Link
        href={instagramUrl}
        title={`Instagram-${title}`}
        target="_blank"
        type="external"
        color="#000000"
        disableUnderline
      >
        <Box display="flex" alignItems="center" gap={6} mt={3}>
          <Typography>View on</Typography>
          <InstagramIcon />
        </Box>
      </Link>
    </Box>
  )
}
