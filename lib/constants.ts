export const CMS_NAME = 'Shareuhack'
export const HOME_OG_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_URL + '/assets/share-you-hack.png'

export const HERO_POST_SLUG = 'about-us'

export const Routes = {
  home: '/',
  latest: '/latest',
  knowledge: '/categories/knowledge',
  health: '/categories/health',
  money: '/categories/money',
  work: '/categories/work',
  about: '/about',
  life: '/categories/life',
}

export const NavLinks = [
  {
    key: 'knowledge',
    link: Routes.knowledge,
  },
  {
    key: 'life',
    link: Routes.life,
  },
  {
    key: 'health',
    link: Routes.health,
  },
  {
    key: 'money',
    link: Routes.money,
  },
  {
    key: 'work',
    link: Routes.work,
  },
]

export const Category = {
  knowledge: 'knowledge',
  life: 'life',
  health: 'health',
  money: 'money',
  work: 'work',
}

export const SubCategory = {
  frontendDev: 'frontendDev',
  projectManagement: 'projectManagement',
  eLearning: 'eLearning',
}

export const Categories = [
  {
    key: Category.knowledge,
    link: Routes.knowledge,
  },
  {
    key: Category.life,
    link: Routes.life,
  },
  {
    key: Category.health,
    link: Routes.health,
  },
  {
    key: Category.money,
    link: Routes.money,
  },
  {
    key: Category.work,
    link: Routes.work,
  },
]

export const SubCategories = [
  {
    key: SubCategory.frontendDev,
    category: Category.work,
    link: `/subcategories/frontendDev`,
  },

  {
    key: SubCategory.projectManagement,
    category: Category.knowledge,
    link: `/subcategories/projectManagement`,
  },
  {
    key: SubCategory.eLearning,
    category: Category.knowledge,
    link: `/subcategories/eLearning`,
  },
]
