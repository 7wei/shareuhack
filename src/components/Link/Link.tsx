import { Link as MuiLink, makeStyles, Theme, createStyles, styled } from '@material-ui/core'
import theme from '../../theme/index'

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       color: theme.palette.primary.main,
//       textDecoration: 'none',
//       '&:hover': {
//         color: theme.palette.primary.dark,
//         textDecoration: 'none',
//       },
//     },
//   })
// )

const StyledLink = styled('a')({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.dark,
    textDecoration: 'none',
  },
})

export default function Link({ children, href }: { children: React.ReactNode; href?: string }) {
  return <StyledLink href={href}>{children}</StyledLink>
}
