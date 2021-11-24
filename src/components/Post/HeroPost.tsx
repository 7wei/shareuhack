import { Grid, Box } from '@material-ui/core'
import CoverImage from '../Image/CoverImage'
import { TYPE } from 'theme/index'
import Divider from '../Divider/Divider'
import { useRouter } from 'next/router'
import Link from 'next/link'
import StyledLink from '../../components/Link/Link'

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

  return (
    <section>
      <CoverImage title={title} src={coverImage} slug={slug} height={627} width={1200} alt={excerpt} />
      <Link href={`/posts/${slug}`} locale={locale} passHref>
        <StyledLink>
          <TYPE.largeHeader mt="8px" mb="8px">
            {title}
          </TYPE.largeHeader>
        </StyledLink>
      </Link>
      <Box mb="15px">
        <Grid container>
          <Grid item sm={relatedPosts.length > 0 ? 7 : 12}>
            <Box mr="10px">
              <TYPE.body>{excerpt}</TYPE.body>
            </Box>
          </Grid>
          {relatedPosts.length > 0 && (
            <Grid item sm={4}>
              <Box ml="10px" mt="7px">
                <Divider />
                <TYPE.header mt="15px" mb="15px">
                  RELATED
                </TYPE.header>
                <Box display="grid" gridGap="10px">
                  {relatedPosts.map((post) => (
                    <Link key={post.slug} href={`/posts/${post.slug}`} locale={locale} passHref>
                      <StyledLink>
                        <TYPE.bold>{post.title}</TYPE.bold>
                      </StyledLink>
                    </Link>
                  ))}
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </section>
  )
}
