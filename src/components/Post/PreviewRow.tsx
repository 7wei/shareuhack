import { Grid, Box } from '@material-ui/core'
import { TYPE } from 'theme/index'
import PostPreview from './PostPreview'
import StyledLink from '../Link/Link'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export default function CategorySection({
  category,
  description,
  posts,
  link,
}: {
  category: string
  description: string
  posts: {
    title: string
    coverImage: string
    date: string
    excerpt: string
    slug: string
  }[]
  link: string
}) {
  const { locale } = useRouter()
  const { t } = useTranslation('common')

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <TYPE.largeHeader mt="15px">{category}</TYPE.largeHeader>
        <Link href={link} passHref locale={locale}>
          <StyledLink>{t('showAll')}</StyledLink>
        </Link>
      </Box>
      <Grid container>
        <Grid item sm={6}>
          <TYPE.body>{description}</TYPE.body>
        </Grid>
      </Grid>
      <Box mt="10px">
        <Grid spacing={3} container>
          {posts &&
            posts.map((post) => (
              <Grid key={post.title} item sm={4}>
                <PostPreview {...post} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  )
}
