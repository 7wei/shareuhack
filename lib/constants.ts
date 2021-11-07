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
  finance: 'finance',
  business: 'business',
  travel: 'travel',
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

const subcategoryBasePath = '/subcategories'

export const SubCategories = [
  {
    key: SubCategory.frontendDev,
    category: Category.work,
    link: `${subcategoryBasePath}/${SubCategory.frontendDev}`,
  },

  {
    key: SubCategory.projectManagement,
    category: Category.knowledge,
    link: `${subcategoryBasePath}/${SubCategory.projectManagement}`,
  },
  {
    key: SubCategory.eLearning,
    category: Category.knowledge,
    link: `${subcategoryBasePath}/eLearning`,
  },
  {
    key: SubCategory.finance,
    category: Category.money,
    link: `${subcategoryBasePath}/${SubCategory.finance}`,
  },
  {
    key: SubCategory.business,
    category: Category.money,
    link: `${subcategoryBasePath}/${SubCategory.business}`,
  },
  {
    key: SubCategory.travel,
    category: Category.life,
    link: `${subcategoryBasePath}/${SubCategory.travel}`,
  },
]

export const Locales = [
  {
    key: 'en-US',
    language: 'English',
    region: 'United State',
  },
  {
    key: 'en-GB',
    language: 'English',
    region: 'United Kingdom',
  },
  {
    key: 'en-SG',
    language: 'English',
    region: 'Singapore',
  },
  {
    key: 'zh-TW',
    language: '繁體中文',
    region: '台灣',
  },
  {
    key: 'zh-MO',
    language: '繁體中文',
    region: '澳門',
  },
  {
    key: 'zh-HK',
    language: '繁體中文',
    region: '香港',
  },
  {
    key: 'zh-CN',
    language: '简体中文',
    region: '中国',
  },
  {
    key: 'ja-JP',
    language: '日本語',
    region: '日本',
  },
]

export const HotPostSlugs = [
  'how-to-get-pmp-2021',
  'how-to-become-a-frontend-engineer',
  'how-to-get-best-price-on-udemy-courses',
  'learn-to-financial-freedom-from-amazon-bestsellers',
]
