import { useState } from 'react'
import { Button, Dialog, Grid, ListItem, Box, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Locales } from '../../../lib/constants'
import LanguageIcon from '@mui/icons-material/Language'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

export default function LanguageSelector() {
  const { t } = useTranslation('common')
  const { locale, locales } = useRouter()
  const router = useRouter()
  const theme = useTheme()

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

  const getLocaleData = (locale?: string) => {
    const data = Locales.find((el) => el.key === locale)
    if (!data) {
      return Locales[0]
    }
    return data
  }

  return (
    <>
      <Button onClick={handleOpen} color="primary">
        <Box display="flex" alignItems="center" gap={6}>
          <LanguageIcon fontSize="small" />
          <Typography variant="body1">{getLocaleData(locale).language}</Typography>
        </Box>
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <Box padding="30px 48px">
          <Box display="flex" alignItems="center" gap={6}>
            <LanguageIcon />
            <Typography variant="h3">{t('selectLocale')}</Typography>
          </Box>
          <Grid container spacing={8} mt={14}>
            {Locales?.map(({ key: loc }) => (
              <Grid key={loc} item xs={12} md={6}>
                <ListItem button onClick={() => onSelect(loc)} key={loc}>
                  <Box display="flex" alignItems="center" gap={6}>
                    <Typography variant="body2">{getLocaleData(loc).language}</Typography>
                    {locale === loc && <CheckCircleOutlineIcon fontSize="small" color="primary" />}
                  </Box>
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Dialog>
    </>
  )
}
