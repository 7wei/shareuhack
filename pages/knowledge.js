import { Grid, Box } from '@material-ui/core'
import { Category, Categories, Routes } from '../lib/constants'
import { TYPE } from '../src/theme/index'
import { getCategoryPosts } from '../lib/api'
import InfoCard from '../src/components/InfoCard/InfoCard'
import Link from '../src/components/Link/Link'
import useBreakpoint from '../src/hooks/useBreakpoint'
import PreviewRow from '../src/components/Post/PreviewRow'
import Divider from '../src/components/Divider/Divider'

export default function Knowledge({ category, grouped }) {
  const { matches } = useBreakpoint()

  return (
    <>
      <Grid container>
        <Grid item sm={9}>
          <TYPE.extraLargeHeader>{category.title}</TYPE.extraLargeHeader>
          <TYPE.body>{category.description}</TYPE.body>
        </Grid>
        <Grid item sm={3}>
          {!matches && (
            <InfoCard>
              <TYPE.bold mb="15px">WHAT WE DO</TYPE.bold>
              <TYPE.body>
                我們熱衷於研究、分享並實際測試實用的知識、生活密技，幫助你效率的做好每件事，成為LifeHacker！
                <br />
                <Link href={Routes.about}>--了解更多</Link>
              </TYPE.body>
            </InfoCard>
          )}
        </Grid>
      </Grid>
      <Box mt={matches ? '15px' : 0}>
        {grouped &&
          Object.keys(grouped).map((key) => (
            <Box key={key} mb="15px">
              <Divider primary="true" />
              <PreviewRow
                category={key}
                description={''}
                posts={grouped[key]}
                link={process.env.NEXT_PUBLIC_BASE_URL + `/subCategory/${key}`}
              />
            </Box>
          ))}
      </Box>
    </>
  )
}

export async function getStaticProps() {
  const category = Categories.filter((category) => category.title === Category.knowledge)[0]
  const posts = getCategoryPosts(Category.knowledge, ['title', 'coverImage', 'date', 'excerpt', 'slug'])

  const groupBy = (items, key) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      {}
    )

  const grouped = groupBy(posts, 'subCategory')
  return {
    props: { category, grouped },
  }
}
