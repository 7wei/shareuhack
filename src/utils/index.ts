import { parseISO, format } from 'date-fns'

export function formattedDate(dateString: string) {
  if (!dateString) {
    return
  }

  const date = parseISO(dateString)

  return format(date, 'LLLL	d, yyyy')
}

export function canonicalLocale(locale: string) {
  if (locale.includes('zh')) {
    return 'zh-TW'
  }

  if (locale.includes('en')) {
    return `en-US`
  }

  return locale
}
