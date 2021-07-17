import { parseISO, format } from 'date-fns'

export function formattedDate(dateString: string) {
  if (!dateString) {
    return
  }

  const date = parseISO(dateString)

  return format(date, 'LLLL	d, yyyy')
}
