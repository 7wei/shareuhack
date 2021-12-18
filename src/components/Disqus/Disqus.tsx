import { DiscussionEmbed } from 'disqus-react'
import { Box } from '@mui/material'

const Disqus = ({ title, slug }: { title: string; slug: string }) => {
  const disqusShortname = `${process.env.NEXT_PUBLIC_DISQUS_NAME}`
  const disqusConfig = {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`,
    identifier: slug,
    title: title,
  }
  return (
    <Box
      sx={{
        '& * a': {
          color: 'white !important',
        },
      }}
    >
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </Box>
  )
}
export default Disqus
