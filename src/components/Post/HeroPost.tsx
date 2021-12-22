import { Grid, Box, Typography } from '@mui/material'
import CoverImage from '../Image/CoverImage'
import Divider from '../Divider/Divider'
import { useRouter } from 'next/router'
import Link from '../../components/Link/Link'
import { theme } from 'theme'

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
      <Link href={`/posts/${slug}`} locale={locale} color={theme.palette.text.primary}>
        <Typography variant="h4" mt="8px" mb="8px" component="h3">
          {title}
        </Typography>
      </Link>
      <Box mb="15px">
        <Grid container>
          <Grid item sm={relatedPosts.length > 0 ? 7 : 12}>
            <Box mr="10px">
              <Typography variant="body1">{excerpt}</Typography>
            </Box>
          </Grid>
          {relatedPosts.length > 0 && (
            <Grid item sm={5}>
              <Box ml="10px" mt="7px">
                <Divider />
                <Typography variant="h4" mt="15px" mb="15px" component="h3">
                  RELATED
                </Typography>
                <Box display="grid" gap="10px">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                      locale={locale}
                      color={theme.palette.text.primary}
                    >
                      <Typography fontWeight={500} component="h4">
                        {post.title}
                      </Typography>
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
