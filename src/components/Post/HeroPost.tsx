import { Grid, Box, Typography } from '@mui/material'
import CoverImage from '../Image/CoverImage'
import Divider from '../Divider/Divider'
import { useRouter } from 'next/router'
import Link from '../../components/Link/Link'
import { theme } from 'theme'
import useBreakpoint from 'hooks/useBreakpoint'

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
  const isDownMd = useBreakpoint('md')

  return (
    <section>
      <CoverImage
        title={title}
        src={coverImage}
        slug={slug}
        height={isDownMd ? 172 : 308}
        width={isDownMd ? 330 : 590}
        alt={excerpt}
        priority
      />
      <Link href={`/posts/${slug}`} locale={locale} color={theme.palette.text.primary} title={'Shareuhack|' + title}>
        <Typography mt="8px" mb="8px" component="h3" variant="h1">
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
                <Divider primary />
                <Typography variant="h4" mt="15px" mb="15px" component="h3" color="primary">
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
                      <Typography fontWeight={500} component="h4" variant="h6">
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
