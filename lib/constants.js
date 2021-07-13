export const EXAMPLE_PATH = 'blog-starter'
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
  tech: '/tech',
}

export const NavLinks = [
  {
    title: '學習',
    link: Routes.knowledge,
  },
  {
    title: '科技',
    link: Routes.tech,
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

export const Highlight = {
  knowledge: ['dummy1', 'dummy2', 'dummy3'],
  tech: ['dummy1', 'dummy2', 'dummy3'],
  health: ['dummy1', 'dummy2', 'dummy3'],
  money: ['dummy1', 'dummy2', 'dummy3'],
  work: ['dummy1', 'dummy2', 'dummy3'],
}

export const Categories = [
  {
    title: '學習',
    description:
      '高效率的學習非常的重要，尤其是你想做的事特別多時，Shareuhack幫你預覽50+個課程、閱讀100+評論和心得文章，精煉出達成目的，所需要的最短路徑',
    slugs: Highlight.knowledge,
  },
  {
    title: '科技',
    description:
      '高效率的學習非常的重要，尤其是你想做的事特別多時，Shareuhack幫你預覽50+個課程、閱讀100+評論和心得文章，精煉出達成目的，所需要的最短路徑',
    slugs: Highlight.tech,
  },
  {
    title: '健康',
    description:
      '對任何生物體，健康是一種動態平衡。這是一種平衡的狀態：均衡地輸入和輸出能量和物質（甚至允許生長）。健康也意味著有繼續生存的期望。對有情感的動物，例如人類，自演化以來就有追求生理面與物質面兩種更好的生活方式，所以對健康的認知與要求會有更廣的概念。',
    slugs: Highlight.health,
  },
  {
    title: '金錢',
    description:
      '通常，每個國家都只使用唯一的貨幣。貨幣由當局的中央銀行機構強制發行和控制，中央銀行有權決定本國貨幣的面值和發行量，但無權決定貨幣的市場購買力。不過也存在例外，亦即多個國家可以使用同一種貨幣。例在歐盟國家通用的歐元，在西非國家經濟共同體的西非法郎，以及在19世紀的拉丁貨幣同盟，名稱不同但能在聯盟內部自由流通的等值貨幣。',
    slugs: Highlight.money,
  },
  {
    title: '工作',
    description: '工作可指：就業崗位，如：找工作。職業，如：他的工作是銷售。勞動的過程或狀態，如：他正在工作中。',
    slugs: Highlight.work,
  },
]
