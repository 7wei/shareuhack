import { useState, useCallback } from 'react'
import { IconButton, Dialog, DialogTitle, List, ListItem, Box } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Locales } from '../../../lib/constants'
import LanguageIcon from '@material-ui/icons/Language'
import useBreakpint from 'hooks/useBreakpoint'

export default function LanguageSelector() {
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
    router.push(router.asPath, router.asPath, { locale: locale })
  }

  const getLocaleData = useCallback(
    (locale?: string) => {
      return Locales.find((el) => el.key === locale) || Locales[0]
    },
    [locale]
  )

  return (
    <Box zIndex={999999}>
      <IconButton onClick={handleOpen} color="primary">
        <LanguageIcon />
        {/* <Box ml="5px" fontSize={14} display={matches ? 'none' : 'block'}>
          {getLocaleData(locale).language}({getLocaleData(locale).region})
        </Box> */}
      </IconButton>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">
          <Box display="flex" alignItems="center">
            <LanguageIcon />
            <Box ml="5px">{t('selectLocale')}</Box>
          </Box>
        </DialogTitle>
        <List>
          {locales?.map((locale) => (
            <ListItem button onClick={() => onSelect(locale)} key={locale}>
              {getLocaleData(locale).language}({getLocaleData(locale).region})
            </ListItem>
          ))}
        </List>
      </Dialog>
    </Box>
  )
}
