import { makeStyles } from '@material-ui/core'
import theme from 'theme'

const useStyles = makeStyles({
  markdown: {
    '& blockquote': {
      color: theme.palette.primary.main,
      borderLeft: `3px solid ${theme.palette.primary.main}`,
      paddingLeft: 9,
      margin: 0,
    },
    '& p': {
      fontSize: 16,
    },
    '& p a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
    '& p a:hover': {
      color: theme.palette.primary.dark,
    },
  },
})

export default function PostBody({ content }: { content: string }) {
  const classes = useStyles()
  return (
    <div className="max-w-2xl mx-auto">
      <div className={classes.markdown} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
