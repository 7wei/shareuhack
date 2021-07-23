import { DiscussionEmbed } from 'disqus-react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    '& * a': {
      color: 'white !important',
    },
  },
})

const Disqus = ({ title, slug }: { title: string; slug: string }) => {
  const classes = useStyles()
  const disqusShortname = `${process.env.NEXT_PUBLIC_DISQUS_NAME}`
  const disqusConfig = {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`,
    identifier: slug,
    title: title,
  }
  return (
    <div className={classes.root}>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  )
}
export default Disqus
