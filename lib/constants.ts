export const CMS_NAME = 'Shareuhack'
export const HOME_OG_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_URL + '/assets/brand/shareuhack.jpg'

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

export const Category = {
  life: 'life',
  knowledge: 'knowledge',
  work: 'work',
  money: 'money',
}

export const SubCategory = {
  softwareDevelopment: 'softwareDevelopment',
  projectManagement: 'projectManagement',
  investment: 'investment',
  entrepreneurship: 'entrepreneurship',
  travel: 'travel',
  lifePhilosophy: 'lifePhilosophy',
  education: 'education',
  managementAndLeadership: 'managementAndLeadership',
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
    key: SubCategory.softwareDevelopment,
    category: Category.work,
    link: `${subcategoryBasePath}/${SubCategory.softwareDevelopment}`,
  },
  {
    key: SubCategory.projectManagement,
    category: Category.work,
    link: `${subcategoryBasePath}/${SubCategory.projectManagement}`,
  },
  {
    key: SubCategory.investment,
    category: Category.money,
    link: `${subcategoryBasePath}/${SubCategory.investment}`,
  },
  {
    key: SubCategory.entrepreneurship,
    category: Category.money,
    link: `${subcategoryBasePath}/${SubCategory.entrepreneurship}`,
  },
  {
    key: SubCategory.travel,
    category: Category.life,
    link: `${subcategoryBasePath}/${SubCategory.travel}`,
  },
  {
    key: SubCategory.lifePhilosophy,
    category: Category.life,
    link: `${subcategoryBasePath}/${SubCategory.lifePhilosophy}`,
  },
  {
    key: SubCategory.education,
    category: Category.knowledge,
    link: `${subcategoryBasePath}/${SubCategory.education}`,
  },
  {
    key: SubCategory.managementAndLeadership,
    category: Category.work,
    link: `${subcategoryBasePath}/${SubCategory.managementAndLeadership}`,
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
  'blinkist-an-efficient-way-to-get-key-ideas',
  'sense-of-ritual-best-practice',
  'how-to-become-a-frontend-engineer',
  'how-to-get-best-price-on-udemy-courses',
]
