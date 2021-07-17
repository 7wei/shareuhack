export const CMS_NAME = 'Shareuhack'
export const HOME_OG_IMAGE_URL =
  'https://og-image.vercel.app/Next.js%20Blog%20Starter%20Example.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg'

export const Routes = {
  home: '/',
  latest: '/latest',
  knowledge: '/knowledge',
  health: '/health',
  money: '/money',
  work: '/work',
  about: '/about',
  life: '/life',
}

export const NavLinks = [
  {
    title: '學習',
    link: Routes.knowledge,
  },
  {
    title: '生活',
    link: Routes.life,
  },
  {
    title: '健康',
    link: Routes.health,
  },
  {
    title: '金錢',
    link: Routes.money,
  },
  {
    title: '工作',
    link: Routes.work,
  },
]

export const Category = {
  knowledge: '學習',
  life: '生活',
  health: '健康',
  money: '金錢',
  work: '工作',
}

export const SubCategory = {
  ['frontend-dev']: '前端開發',
  ['backend-dev']: '後端開發',
  ['product-management']: '產品管理',
}

export const Categories = [
  {
    title: Category.knowledge,
    description:
      '高效率的學習非常的重要，尤其是你想做的事特別多時，Shareuhack幫你預覽50+個課程、閱讀100+評論和心得文章，精煉出達成目的，所需要的最短路徑',
    link: Routes.knowledge,
  },
  {
    title: Category.life,
    description:
      '高效率的學習非常的重要，尤其是你想做的事特別多時，Shareuhack幫你預覽50+個課程、閱讀100+評論和心得文章，精煉出達成目的，所需要的最短路徑',
    link: Routes.life,
  },
  {
    title: Category.health,
    description:
      '對任何生物體，健康是一種動態平衡。這是一種平衡的狀態：均衡地輸入和輸出能量和物質（甚至允許生長）。健康也意味著有繼續生存的期望。對有情感的動物，例如人類，自演化以來就有追求生理面與物質面兩種更好的生活方式，所以對健康的認知與要求會有更廣的概念。',
    link: Routes.health,
  },
  {
    title: Category.money,
    description:
      '通常，每個國家都只使用唯一的貨幣。貨幣由當局的中央銀行機構強制發行和控制，中央銀行有權決定本國貨幣的面值和發行量，但無權決定貨幣的市場購買力。不過也存在例外，亦即多個國家可以使用同一種貨幣。例在歐盟國家通用的歐元，在西非國家經濟共同體的西非法郎，以及在19世紀的拉丁貨幣同盟，名稱不同但能在聯盟內部自由流通的等值貨幣。',
    link: Routes.money,
  },
  {
    title: Category.work,
    description: '工作可指：就業崗位，如：找工作。職業，如：他的工作是銷售。勞動的過程或狀態，如：他正在工作中。',
    link: Routes.health,
  },
]

export const SubCategories = [
  {
    title: SubCategory['frontend-dev'],
    description:
      'Front-end web development is the practice of converting data to a graphical interface, through the use of HTML, CSS, and JavaScript, so that users can view and interact with that data.',
  },
  {
    title: SubCategory['backend-dev'],
    description:
      'Back end Development refers to the server side of development where you are primarily focused on how the site works. Making updates and changes in addition to monitoring functionality of the site will be your primary responsibility.',
  },
  {
    title: SubCategory['product-management'],
    description:
      'Product management is an organisational function within a company dealing with new product development, business justification, planning, verification, forecasting, pricing, product launch, and marketing of a product or products at all stages of the product lifecycle',
  },
]
