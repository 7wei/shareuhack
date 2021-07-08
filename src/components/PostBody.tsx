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
      color: '#d6363c',
      textDecoration: 'none',
    },
    '& p a:hover': {
      color: '#ED5A62',
    },
    '& hr': {
      width: '60%',
      height: 3,
      backgroundColor: theme.palette.primary.main,
      border: 'none',
      margin: '50px auto',
    },
    '& p img': {
      width: '100%',
    },
    '& ul,ol': {
      margin: 0,
      paddingLeft: 18,
      fontSize: 16,
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
