import { parseISO, format } from 'date-fns'

export function formattedDate(dateString: string) {
  const date = parseISO(dateString)

  return format(date, 'LLLL	d, yyyy')
}
