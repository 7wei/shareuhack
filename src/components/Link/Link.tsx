import { Link as MuiLink, makeStyles, Theme, createStyles, styled } from '@material-ui/core'
import theme from '../../theme/index'

const Link = styled('a')({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.dark,
    textDecoration: 'none',
  },
})

export default Link
