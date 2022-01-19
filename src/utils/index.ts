import { parseISO, format } from 'date-fns'
import { event } from '../../lib/gtag'

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

export function bindTrackingClicks() {
  const anchors = document.getElementsByTagName('a')

  for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener(
      'click',
      function (e) {
        const target = e.target as HTMLAnchorElement

        event({
          action: 'click',
          category: target.rel === 'sponsored' ? 'aff' : 'normal',
          label: target.innerText,
          value: Math.floor(Date.now() / 1000),
        })
      },
      false
    )
  }
}
