import { Link, makeStyles, Box } from '@material-ui/core'
import Container from './Container'
import theme, { TYPE } from 'theme/index'

const links = [
  {
    title: '熱門文章',
    link: '/popular',
  },
  {
    title: '數位學習',
    link: '/knowledge',
  },
  {
    title: '生活',
    link: '/lifestyle',
  },
  {
    title: '虛擬貨幣',
    link: '/crypto',
  },
  {
    title: '關於',
    link: '/about',
  },
]

const useStyles = makeStyles({
  navlink: {
    fontSize: 18,
    textDecoration: 'none',
    color: 'inherit',
    position: 'relative',
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
    '&:after': {
      position: 'absolute',
      content: '""',
      height: 3,
      bottom: -4,
      margin: '0 auto',
      left: 0,
      right: 0,
      width: '100%',
      background: theme.palette.primary.main,
      transition: '.5s',
    },
    '&:hover:after': {
      width: '80%',
      background: theme.palette.primary.main,
    },
  },
})

export default function Header() {
  const classes = useStyles()
  return (
    <Container>
      <TYPE.brand>
        <Link href="/" color="inherit" underline="none">
          Share.U.Hack
        </Link>
        <Box display="flex" height="80px" alignItems="center" gridColumnGap="16px">
          {links.map((link) => (
            <Link className={classes.navlink} href={link.link}>
              {link.title}
            </Link>
          ))}
        </Box>
      </TYPE.brand>
    </Container>
  )
}
