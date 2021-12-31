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
  const isDownMd = useBreakpoint('md')

  return (
    <Box
      sx={{
        backgroundColor: bgColor ?? 'transparent',
        padding: 15,
        borderRadius: '5px',
        '& ol': {
          paddingLeft: 15,
        },
      }}
    >
      {title && (
        <Typography fontSize={isDownMd ? 14 : 16} fontWeight={isDownMd ? 500 : 700} mb={5} component="h3" variant="h5">
          {title}
        </Typography>
      )}
      {content && (
        <Typography fontSize={isDownMd ? 12 : 14} component="div" variant="body1">
          {content}
        </Typography>
      )}
      {children}
      {link && linkText && (
        <Link href={link} locale={locale} color={theme.palette.text.primary}>
          <Typography variant="h6" color="primary" fontSize={12}>
            {linkText}
          </Typography>
        </Link>
      )}
    </Box>
  )
}
