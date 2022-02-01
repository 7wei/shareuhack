import { Box, Typography } from '@mui/material'
import Link from 'components/Link/Link'
import Carousel from 'components/Carousel'
import InstagramIcon from '@mui/icons-material/Instagram'
import useBreakpoint from 'hooks/useBreakpoint'

export default function InstaPost({
  instagramUrl,
  title,
  slideUrls,
  width,
  height,
  showInstagram,
  postUrl,
}: {
  instagramUrl: string
  title: string
  slideUrls: string[]
  width?: string | number
  height?: string | number
  showInstagram?: boolean
  postUrl?: string
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
        width: width || '100%',
        height: height || '100%',
      }}
    >
      {/* <Box
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
      </Box> */}
      <Carousel urls={slideUrls} size={'100%'} />
      {showInstagram && (
        <Link
          href={instagramUrl}
          title={`Instagram-${title}`}
          target="_blank"
          type="external"
          color="#000000"
          disableUnderline
        >
          <Box display="flex" alignItems="center" gap={6} mt={6}>
            <Typography>View on</Typography>
            <InstagramIcon />
          </Box>
        </Link>
      )}
      {postUrl && (
        <Box mt={6}>
          <Link href={postUrl} title={title} type="nav" color="#000000" disableUnderline>
            View Detail
          </Link>
        </Box>
      )}
    </Box>
  )
}
