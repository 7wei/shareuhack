import { Grid, Box, Link } from '@material-ui/core'
import CoverImage from '../Image/CoverImage'
import { TYPE } from 'theme/index'
import Divider from '../Divider/Divider'

export default function HeroPost({
  title,
  coverImage,
  excerpt,
  slug,
  related,
}: {
  title: string
  coverImage: string
  excerpt: string
  slug: string
  related: Array<any>
}) {
  return (
    <section>
      <CoverImage title={title} src={coverImage} slug={slug} height={800} width={1200} />
      <TYPE.largeHeader>{title}</TYPE.largeHeader>

      <Grid container>
        <Grid item sm={6}>
          <Box padding="8px">
            <TYPE.body>{excerpt}</TYPE.body>
          </Box>
        </Grid>
        <Grid item sm={6}>
          <Box padding="8px">
            <Divider />
            <TYPE.header mb="15px">相關文章</TYPE.header>
            <Box display="grid" gridGap="5px">
              {related.map((post) => (
                <Link href="#">
                  <TYPE.bold>{post}</TYPE.bold>
                </Link>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* <div className="mb-8 md:mb-16">

      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>
      </div> */}
    </section>
  )
}
