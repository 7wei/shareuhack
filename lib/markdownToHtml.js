import remark from 'remark'
import html from 'remark-html'

export default async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown)
  const resultString = result.toString()
  const resultHTML = resultString.replace(
    new RegExp('<a ', 'g'),
    '<a target="_blank" rel="nofollow noopener noreferrer" '
  )

  return resultHTML
}
