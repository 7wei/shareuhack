import { Box, makeStyles } from '@material-ui/core'
import CoverImage from '../Image/CoverImage'
import { TYPE } from 'theme/index'
import { formattedDate } from '../../utils/index'
import theme from '../../theme/index'
import { useRouter } from 'next/router'
import Link from 'next/link'
import StyledLink from '../../components/Link/Link'

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
  const { locale } = useRouter()

  return (
    <Box maxWidth="300px" className={classes.root}>
      <CoverImage slug={slug} title={title} src={coverImage} height={278} width={556} />
      <Link href={`/posts/${slug}`} locale={locale} passHref>
        <StyledLink>
          <TYPE.bold mt="5px" className={classes.title}>
            {title}
          </TYPE.bold>
          <TYPE.primary>{formattedDate(date)}</TYPE.primary>
          <TYPE.body>{excerpt}</TYPE.body>
        </StyledLink>
      </Link>
    </Box>
  )
}
