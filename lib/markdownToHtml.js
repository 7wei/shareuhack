import remark from 'remark'
import html from 'remark-html'

export default async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown)
  const resultString = result.toString()
  const resultString1 = resultString.replace(new RegExp('<a ', 'g'), '<a target="_blank" ')
  const resultHTML = resultString1.replace(new RegExp('title="affiliate"', 'g'), 'rel="sponsored" ')

  return resultHTML
}

export async function markdownToHtmlAmp(markdown) {
  const result = await remark().use(html).process(markdown)
  const resultString = result.toString()
  const resultString1 = resultString.replace(new RegExp('<img ', 'g'), '<img style="width: 100%" ')
  const resultHTML = resultString1.replace(new RegExp('title=".*?"', 'g'), '')

  return resultHTML
}
