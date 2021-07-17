import { Box, Link, makeStyles } from '@material-ui/core'
import CoverImage from '../Image/CoverImage'
import { TYPE } from 'theme/index'
import { formattedDate } from '../../utils/index'
import theme from '../../theme/index'

const useStyles = makeStyles({
  root: {
    '&:hover $title': {
      color: theme.textColor.text3,
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
}: {
  title: string
  coverImage: string
  date: string
  excerpt: string
  slug: string
}) {
  const classes = useStyles()
  return (
    <Box maxWidth="300px" className={classes.root}>
      <CoverImage slug={slug} title={title} src={coverImage} height={278} width={556} />
      <Link href={`/posts/${slug}`} underline="none">
        <TYPE.bold mt="5px" className={classes.title}>
          {title}
        </TYPE.bold>
        <TYPE.primary>{formattedDate(date)}</TYPE.primary>
        <TYPE.body>{excerpt}</TYPE.body>
      </Link>
    </Box>
  )
}
