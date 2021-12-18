import { useState, useCallback } from 'react'
import { IconButton, Dialog, DialogTitle, List, ListItem, Box, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Locales } from '../../../lib/constants'
import { Language as LanguageIcon } from '@mui/icons-material'
import useBreakpoint from 'hooks/useBreakpoint'

export default function LanguageSelector() {
  const { t } = useTranslation('common')
  const { locale, locales } = useRouter()
  const router = useRouter()
  const isDownMd = useBreakpoint('md')

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
      <Dialog
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 15,
            width: isDownMd ? '100%' : '480px',
            padding: 15,
          },
        }}
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          <Box display="flex" alignItems="center" justifyContent="center">
            <LanguageIcon />
            <Box ml="5px">{t('selectLocale')}</Box>
          </Box>
        </DialogTitle>
        <List>
          <Grid container>
            {locales?.map((locale) => (
              <Grid key={locale} item xs={12} md={6}>
                <ListItem button onClick={() => onSelect(locale)}>
                  {getLocaleData(locale).language}({getLocaleData(locale).region})
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </List>
      </Dialog>
    </Box>
  )
}
