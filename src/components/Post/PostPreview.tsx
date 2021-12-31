import { Box, Typography } from '@mui/material'
import CoverImage from '../Image/CoverImage'
import { formattedDate } from '../../utils/index'
import theme from '../../theme/index'
import { useRouter } from 'next/router'
import Link from '../../components/Link/Link'
import useBreakpoint from 'hooks/useBreakpoint'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  simple,
}: {
  title: string
  coverImage: string
  date: string
  excerpt: string
  slug: string
  simple?: boolean
}) {
  const { locale } = useRouter()
  const isDownMd = useBreakpoint('md')

  return (
    <Box display="grid" gap="10px">
      <CoverImage
        slug={slug}
        title={title}
        src={coverImage}
        height={isDownMd ? 165 : 194}
        width={isDownMd ? 330 : 388}
        alt={excerpt}
      />
      <Link href={`/posts/${slug}`} locale={locale} color={theme.palette.text.primary} title={'Shareuhack|' + title}>
        <Box display="grid" gap="10px">
          <Box sx={{ wordWrap: 'break-word' }}>
            <Typography fontWeight={500} mt="5px" component="h3" variant="h6">
              {title}
            </Typography>
          </Box>

          <Typography variant="body2" color={theme.palette.text.secondary}>
            {formattedDate(date)}
          </Typography>
          <Box
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {!simple && <Typography variant="body1">{excerpt}</Typography>}
          </Box>
        </Box>
      </Link>
    </Box>
  )
}
