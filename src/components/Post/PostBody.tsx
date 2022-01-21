import { Box, useTheme } from '@mui/material'
import { useEffect } from 'react'
import { event } from '../../../lib/gtag'

export default function PostBody({ content }: { content: string }) {
  const theme = useTheme()

  useEffect(() => {
    const postBody = document.getElementById('postBody')
    const anchors = postBody?.getElementsByTagName('a') || []

    const clickEvent = (e: any) => {
      const target = e.target as HTMLAnchorElement
      event({
        action: 'click',
        category: target.rel === 'sponsored' ? 'affiliate' : 'external',
        label: target.innerText,
      })
    }
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].removeEventListener('click', clickEvent)
    }

    for (var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', clickEvent)
    }

    return () => {
      for (var i = 0; i < anchors.length; i++) {
        anchors[i].removeEventListener('click', clickEvent)
      }
    }
  }, [content])

  useEffect(() => {
    window.instgrm.Embeds.process()
  }, [])

  return (
    <Box
      id="postBody"
      sx={{
        '& blockquote': {
          color: theme.palette.text.secondary,
          borderLeft: `3px solid ${theme.palette.text.secondary}`,
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
          color: theme.palette.text.primary,
          fontWeight: 400,
          textDecoration: 'underline',
        },
        '& * a:hover': {
          color: theme.palette.primary.main,
        },
        '& hr': {
          width: '60%',
          height: 3,
          backgroundColor: theme.palette.text.secondary,
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
