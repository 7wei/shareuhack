import { Link as MuiLink, makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.primary.dark,
        textDecoration: 'none',
      },
    },
  })
)

export default function Link({ children, href }: { children: React.ReactNode; href: string }) {
  const classes = useStyles()
  return (
    <MuiLink href={href} className={classes.root}>
      {children}
    </MuiLink>
  )
}
