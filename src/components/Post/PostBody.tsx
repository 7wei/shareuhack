import { Box, useTheme } from '@mui/material'

export default function PostBody({ content }: { content: string }) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        '& blockquote': {
          color: theme.textColor.text2,
          borderLeft: `3px solid ${theme.textColor.text2}`,
          paddingLeft: 9,
          margin: 0,
        },
        '& p': {
          fontSize: 18,
          lineHeight: '26px',
          opacity: 0.9,
        },
        '& h3': {
          fontSize: 18,
          lineHeight: '26px',
          opacity: 0.9,
        },
        '& * a': {
          color: theme.textColor.text1,
          fontWeight: 400,
          textDecoration: 'underline',
        },
        '& * a:hover': {
          color: theme.palette.primary.main,
        },
        '& hr': {
          width: '60%',
          height: 3,
          backgroundColor: theme.textColor.text3,
          border: 'none',
          margin: '50px auto',
        },
        '& p img': {
          width: '100%',
        },
        '& ul,ol': {
          margin: 0,
          paddingLeft: 18,
          fontSize: 18,
          lineHeight: '26px',
          opacity: 0.9,
        },
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
