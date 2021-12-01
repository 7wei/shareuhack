export function structuredDataFaq(faqs: { question: string; answer: string }[]) {
  const mainEntity = faqs.map(({ question, answer }) => {
    return {
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    }
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mainEntity,
  }
}
