import { Box, makeStyles } from '@material-ui/core'
import CoverImage from '../Image/CoverImage'
import { TYPE } from 'theme/index'
import { formattedDate } from '../../utils/index'
import theme from '../../theme/index'
import { useRouter } from 'next/router'
import Link from '../../components/Link/Link'

const useStyles = makeStyles({
  root: {
    '&:hover $title': {
      color: theme.palette.primary.main,
    },
  },
  title: {},
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
  const classes = useStyles()
  const { locale } = useRouter()

  return (
    <Box className={classes.root} width="100%">
      <CoverImage slug={slug} title={title} src={coverImage} height={278} width={556} alt={excerpt} />
      <Link href={`/posts/${slug}`} locale={locale}>
        <TYPE.bold mt="5px" className={classes.title}>
          {title}
        </TYPE.bold>
        <TYPE.primary>{formattedDate(date)}</TYPE.primary>
        {!simple && <TYPE.body>{excerpt}</TYPE.body>}
      </Link>
    </Box>
  )
}
