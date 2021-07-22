import { DiscussionEmbed } from 'disqus-react'

const Disqus = ({ title, slug }: { title: string; slug: string }) => {
  const disqusShortname = 'shareuhack'
  const disqusConfig = {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`,
    identifier: slug,
    title: title,
  }
  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  )
}
export default Disqus
