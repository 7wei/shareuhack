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
    // description:
    // '前端開發是通過HTML/CSS/JavsScript以及衍生的各種技術、框架、解決方案，創建網站、APP等介面，實現和網路產品用戶的互動。',
    category: Category.work,
    link: `/subcategories/frontend-dev`,
  },
  // {
  //   title: SubCategory['backend-dev'],
  //   description:
  //     'Back end Development refers to the server side of development where you are primarily focused on how the site works. Making updates and changes in addition to monitoring functionality of the site will be your primary responsibility.',
  //   category: Category.knowledge,
  // },
  // {
  //   title: SubCategory['product-management'],
  //   description:
  //     'Product management is an organisational function within a company dealing with new product development, business justification, planning, verification, forecasting, pricing, product launch, and marketing of a product or products at all stages of the product lifecycle',
  //   category: Category.knowledge,
  // },
  {
    key: SubCategory.projectManagement,
    // description: '專案管理是在各種限制下，帶領團隊，並達成專案目標的過程。',
    category: Category.knowledge,
    link: `/subcategories/project-management`,
  },
  {
    key: SubCategory.eLearning,
    // description: '線上學習，在2021已成顯學。',
    category: Category.knowledge,
    link: `/subcategories/e-learning`,
  },
]
