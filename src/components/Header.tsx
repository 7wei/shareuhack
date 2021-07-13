import { Link, makeStyles, Box } from '@material-ui/core'
import Container from './Container/Container'
import theme, { TYPE } from 'theme/index'
import { NavLinks, Routes } from '../../lib/constants'

const useStyles = makeStyles({
  root: {
    // height: 260,
    paddingTop: 30,
  },
  navlink: {
    fontSize: 16,
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
    <div className={classes.root}>
      <Container>
        <TYPE.brand textAlign="center">
          <Link href="/" color="inherit" underline="none">
            Share.You.Hack
          </Link>
        </TYPE.brand>
        <Box display="flex" height="80px" alignItems="center" justifyContent="center" gridColumnGap="16px">
          {NavLinks.map((link) => (
            <Link key={link.title} className={classes.navlink} href={link.link}>
              {link.title}
            </Link>
          ))}
        </Box>
        <TYPE.primary textAlign="center" fontSize="14px" mb="48px">
          Shareuhack是仰賴用戶支持而持續產生內容的，當您透過網站內的連結購買商品或課程，我們可能因此收益。
          <Link href={Routes.about} underline="always">
            了解更多
          </Link>
        </TYPE.primary>
      </Container>
    </div>
  )
}
