import { Grid, Box } from '@material-ui/core'
import { Category, Categories, Routes, SubCategory, SubCategories } from '../../lib/constants'
import { TYPE } from '../../src/theme/index'
import { getCategoryPosts, getSubCategoryPosts } from '../../lib/api'
import InfoCard from '../../src/components/InfoCard/InfoCard'
import Link from '../../src/components/Link/Link'
import useBreakpoint from '../../src/hooks/useBreakpoint'
import PreviewRow from '../../src/components/Post/PreviewRow'
import Divider from '../../src/components/Divider/Divider'
import Disclaimer from '../../src/components/Disclaimer/Disclaimer'

export default function CategoryPage({ category, subCategories }) {
  const { matches } = useBreakpoint()

  return (
    <>
      <Disclaimer />
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
        {subCategories.map((subCategory) => (
          <Box key={subCategory.title} mb="15px">
            <Divider primary />
            <PreviewRow
              category={subCategory.title}
              description={subCategory.description}
              posts={subCategory.posts}
              link={subCategory.link}
            />
          </Box>
        ))}

        {subCategories.length === 0 && (
          <Box height="calc(100vh - 580px)" display="flex" justifyContent="center" alignItems="center">
            <TYPE.primary mb="15px" fontSize={18}>
              近期即將更新文章，既請期待！
            </TYPE.primary>
          </Box>
        )}
      </Box>
    </>
  )
}

export async function getStaticProps({ params }) {
  const category = Categories.find((category) => category.title === Category[params.category])
  const categoryPosts = getCategoryPosts(params.category, [
    'title',
    'coverImage',
    'date',
    'excerpt',
    'slug',
    'subCategory',
  ]).slice(0, 3)

  const subCategories = SubCategories.filter((el) => el.category === category.title).map(({ title, description }) => {
    const subCategory = Object.keys(SubCategory).find((key) => SubCategory[key] === title)
    const posts = categoryPosts.filter((post) => post.subCategory === subCategory)
    const link = process.env.NEXT_PUBLIC_BASE_URL + `/subcategories/${subCategory}`
    return {
      title,
      description,
      posts,
      link,
    }
  })

  return {
    props: { category, subCategories },
  }
}

export async function getStaticPaths() {
  const categories = Object.keys(Category)

  return {
    paths: categories.map((category) => {
      return {
        params: {
          category,
        },
      }
    }),
    fallback: false,
  }
}