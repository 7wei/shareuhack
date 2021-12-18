import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'

interface Props {
  title?: string
  children?: React.ReactNode
}

export default function InfoCard(props: Props) {
  const { title, children } = props
  const theme = useTheme()

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.light,
        padding: 15,
        marginBottom: 15,
        borderRadius: 5,
        '& ol': {
          paddingLeft: 15,
        },
      }}
    >
      {title && (
        <Typography fontWeight={500} mb={5}>
          {title}
        </Typography>
      )}
      {children}
    </Box>
  )
}
