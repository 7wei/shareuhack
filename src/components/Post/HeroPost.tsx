import { Box, Typography } from '@mui/material'
import CoverImage from '../Image/CoverImage'
import { useRouter } from 'next/router'
import Link from '../../components/Link/Link'
import { theme } from 'theme'
import useBreakpoint from 'hooks/useBreakpoint'

export default function HeroPost({
  title,
  coverImage,
  excerpt,
  slug,
  relatedPosts,
}: {
  title: string
  coverImage: string
  excerpt: string
  slug: string
  relatedPosts: Array<any>
}) {
  const { locale } = useRouter()
  const isDownMd = useBreakpoint('md')

  return (
    <Box>
      <CoverImage
        title={title}
        src={coverImage}
        slug={slug}
        href={`/about`}
        height={isDownMd ? 172 : 308}
        width={isDownMd ? 330 : 590}
        alt={excerpt}
        priority
      />
      <Link
        href={`/about`}
        locale={locale}
        color={theme.palette.text.primary}
        title={'Shareuhack|' + title}
        disableUnderline
      >
        <Typography mt="8px" mb="8px" component="h3" variant="h2">
          {title}
        </Typography>
      </Link>
      <Box
        mr="10px"
        mt="12px"
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        <Typography variant="body1">{excerpt}</Typography>
      </Box>
    </Box>
  )
}
