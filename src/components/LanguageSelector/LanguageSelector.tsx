import { useState } from 'react'
import { Button, Dialog, DialogTitle, makeStyles, List, ListItem, ListItemText } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
// import { setLocale } from '../../../lib/api'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

export default function LanguageSelector() {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { locale, locales } = useRouter()
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function setLocale(locale: string) {
    document.cookie = `NEXT_LOCALE=${locale}; expires=Fri, 31 Dec 9999 23:59:59 GMT`
  }

  const onSelect = (locale: string) => {
    setLocale(locale)
    setOpen(false)
    console.log()
    router.push(router.asPath, router.asPath, { locale: locale })
  }

  return (
    <>
      <Button onClick={handleOpen}>{locale || 'en-US'}</Button>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">{t('selectLocale')}</DialogTitle>
        <List>
          {locales?.map((locale) => (
            <ListItem button onClick={() => onSelect(locale)} key={locale}>
              <ListItemText primary={locale} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  )
}
