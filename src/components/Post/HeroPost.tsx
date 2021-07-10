import { Grid, Box, Link } from '@material-ui/core'
import CoverImage from '../Image/CoverImage'
import { TYPE } from 'theme/index'
import Divider from '../Divider/Divider'

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
  return (
    <section>
      <CoverImage title={title} src={coverImage} slug={slug} height={800} width={1200} />
      <TYPE.largeHeader mb="8px">{title}</TYPE.largeHeader>
      <Grid container>
        <Grid item sm={7}>
          <Box mr="10px">
            <TYPE.body>{excerpt}</TYPE.body>
          </Box>
        </Grid>
        <Grid item sm={5}>
          <Box ml="10px">
            <Divider />
            <TYPE.header mt="15px" mb="15px">
              RELATED
            </TYPE.header>
            <Box display="grid" gridGap="5px">
              {relatedPosts.map((post) => (
                <Link key={post.slug} href={`/posts/${post.slug}`}>
                  <TYPE.bold>{post.title}</TYPE.bold>
                </Link>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </section>
  )
}
