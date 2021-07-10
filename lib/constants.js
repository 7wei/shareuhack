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
