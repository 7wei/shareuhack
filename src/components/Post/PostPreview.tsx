import { Box, styled, Typography } from '@mui/material'
import CoverImage from '../Image/CoverImage'
import { formattedDate } from '../../utils/index'
import theme from '../../theme/index'
import { useRouter } from 'next/router'
import Link from '../../components/Link/Link'

const BreakWordBox = styled(Box)({
  wordWrap: 'break-word',
})

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
      <Link href={`/posts/${slug}`} locale={locale}>
        <BreakWordBox>
          <Typography fontWeight={500} mt="5px">
            {title}
          </Typography>
        </BreakWordBox>

        <Typography color={theme.palette.primary.main}>{formattedDate(date)}</Typography>
        {!simple && <Typography variant="body1">{excerpt}</Typography>}
      </Link>
    </Box>
  )
}
