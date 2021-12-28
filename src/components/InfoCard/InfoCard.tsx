import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import Link from 'components/Link/Link'
import useBreakpoint from 'hooks/useBreakpoint'

interface Props {
  title?: string
  children?: React.ReactNode
  linkText?: string
  link?: string
}

export default function InfoCard(props: Props) {
  const { title, children, linkText, link } = props
  const theme = useTheme()
  const { locale } = useRouter()
  const isDownMd = useBreakpoint('md')

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        // border: `1px solid ${theme.palette.primary.main}`,
        padding: 15,
        marginBottom: 15,
        borderRadius: '5px',
        '& ol': {
          paddingLeft: 15,
        },
      }}
    >
      {title && (
        <Typography fontSize={isDownMd ? 14 : 16} fontWeight={isDownMd ? 500 : 700} mb={5} component="h3">
          {title}
        </Typography>
      )}
      <Typography fontSize={isDownMd ? 12 : 14} mb={12} component="div">
        {children}
      </Typography>
      {link && linkText && (
        <Link href={link} locale={locale} color={theme.palette.text.primary}>
          <Typography fontSize={12}>{linkText}</Typography>
        </Link>
      )}
    </Box>
  )
}
