import { Link, makeStyles, Box } from '@material-ui/core'
import { NavLinks } from '../../lib/constants'
import Container from './Container/Container'
import theme, { TYPE } from 'theme/index'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#282729',
    height: 180,
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

export default function Footer() {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Container>
        <Box display="flex" alignItems="center" gridColumnGap="16px" paddingTop="36px">
          {NavLinks.map((link) => (
            <Link key={link.title} className={classes.navlink} href={link.link}>
              {link.title}
            </Link>
          ))}
        </Box>
        <Box display="flex" flexDirection="column" gridGap="16px" alignItems="flex-start" marginTop="30px">
          <Link className={classes.navlink} href="#">
            關於Shareuhack
          </Link>
          {/* <Link className={classes.navlink} href="#">
            聯絡我們
          </Link> */}
        </Box>
        <TYPE.smallGray marginTop="40px">Copyright @ Shareuhack 2021. All Rights Reserved.</TYPE.smallGray>
      </Container>
    </Box>
  )
}
