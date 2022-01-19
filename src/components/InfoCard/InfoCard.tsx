import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import Link from 'components/Link/Link'
import useBreakpoint from 'hooks/useBreakpoint'

interface Props {
  title?: string
  content?: string
  linkText?: string
  link?: string
  bgColor?: string
  children?: React.ReactNode
}

export default function InfoCard(props: Props) {
  const { title, content, linkText, link, bgColor, children } = props
  const theme = useTheme()
  const { locale } = useRouter()

  return (
    <Box
      sx={{
        backgroundColor: bgColor ?? 'transparent',
        borderRadius: '5px',
        padding: '15px 0',
        '& ol': {
          pl: 15,
        },
      }}
    >
      {title && (
        <Typography mb={5} variant="h6" color="primary">
          {title}
        </Typography>
      )}
      {content && (
        <Typography component="div" variant="body1" mt={15}>
          {content}
        </Typography>
      )}
      {children}
      {link && linkText && (
        <Box display="flex" justifyContent="flex-end">
          <Link href={link} locale={locale} color={theme.palette.text.primary} title={linkText} type="nav">
            <Typography variant="h6" color="primary" fontSize={12}>
              {linkText}
            </Typography>
          </Link>
        </Box>
      )}
    </Box>
  )
}
