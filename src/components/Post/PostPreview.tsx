import { Box, Link } from '@material-ui/core'
import CoverImage from '../Image/CoverImage'
import { TYPE } from 'theme/index'
import { formattedDate } from '../../utils/index'

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
  return (
    <Box maxWidth="300px">
      <CoverImage slug={slug} title={title} src={coverImage} height={278} width={556} />
      <Link href="#" underline="none">
        <TYPE.bold mt="5px">{title}</TYPE.bold>
        <TYPE.primary>{formattedDate(date)}</TYPE.primary>
        <TYPE.body>{excerpt}</TYPE.body>
      </Link>
    </Box>
  )
}
