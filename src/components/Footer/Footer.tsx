import { Link, makeStyles, Box } from '@material-ui/core'
import { NavLinks, Routes } from '../../../lib/constants'
import Container from '../Container/Container'
import theme, { TYPE } from 'theme/index'
import FacebookIcon from '@material-ui/icons/Facebook'

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
          <Link className={classes.navlink} href={Routes.about}>
            關於Shareuhack
          </Link>
          <Link className={classes.navlink} href="https://www.facebook.com/shareuhack/">
            <Box display="flex" alignItems="center">
              <FacebookIcon /> 聯絡我們
            </Box>
          </Link>
        </Box>
        <TYPE.smallGray marginTop="40px">Copyright @ Shareuhack 2021. All Rights Reserved.</TYPE.smallGray>
      </Container>
    </Box>
  )
}
