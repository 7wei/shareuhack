import React from 'react'
import { Card } from '@mui/material'
import theme from 'theme/index'

export default function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <Card
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
      {children}
    </Card>
  )
}
