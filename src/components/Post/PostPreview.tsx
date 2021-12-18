import { Box, Typography } from '@mui/material'
import CoverImage from '../Image/CoverImage'
import { formattedDate } from '../../utils/index'
import theme from '../../theme/index'
import { useRouter } from 'next/router'
import Link from '../../components/Link/Link'

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

  return (
    <Box
      sx={{
        '&:hover $title': {
          color: theme.palette.primary.main,
        },
      }}
      width="100%"
    >
      <CoverImage slug={slug} title={title} src={coverImage} height={278} width={556} alt={excerpt} />
      <Link href={`/posts/${slug}`} locale={locale} color={theme.palette.text.primary}>
        <Box sx={{ wordWrap: 'break-word' }}>
          <Typography fontWeight={500} mt="5px">
            {title}
          </Typography>
        </Box>

        <Typography color={theme.palette.primary.main}>{formattedDate(date)}</Typography>
        <Box
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {!simple && <Typography variant="body1">{excerpt}</Typography>}
        </Box>
      </Link>
    </Box>
  )
}
