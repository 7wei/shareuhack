import { Box, useTheme } from '@mui/material'
import { CSSProperties } from '@mui/styles'
import useBreakpoint from '../../src/hooks/useBreakpoint'
import { EmailShareButton, FacebookShareButton, TwitterShareButton, LineShareButton } from 'react-share'
import FacebookIcon from '@mui/icons-material/Facebook'
import EmailIcon from '@mui/icons-material/Email'
import TwitterIcon from '@mui/icons-material/Twitter'

function LineIcon({ style }: { style?: CSSProperties }) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        fill: '#000000',
        '& svg:hover': {
          fill: theme.palette.primary.main,
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <svg height="26" viewBox="0 0 48 48" width="26" xmlns="http://www.w3.org/2000/svg" style={style}>
        <path d="m12.5 42h23c3.59 0 6.5-2.91 6.5-6.5v-23c0-3.59-2.91-6.5-6.5-6.5h-23c-3.59 0-6.5 2.91-6.5 6.5v23c0 3.59 2.91 6.5 6.5 6.5z" />
        <path
          d="m37.113 22.417c0-5.865-5.88-10.637-13.107-10.637s-13.108 4.772-13.108 10.637c0 5.258 4.663 9.662 10.962 10.495.427.092 1.008.282 1.155.646.132.331.086.85.042 1.185 0 0-.153.925-.187 1.122-.057.331-.263 1.296 1.135.707 1.399-.589 7.548-4.445 10.298-7.611h-.001c1.901-2.082 2.811-4.197 2.811-6.544zm-18.238 3.49h-2.604c-.379 0-.687-.308-.687-.688v-5.209c0-.379.308-.687.687-.687s.687.308.687.687v4.521h1.917c.379 0 .687.308.687.687 0 .38-.308.689-.687.689zm2.693-.688c0 .379-.308.688-.687.688s-.687-.308-.687-.688v-5.209c0-.379.308-.687.687-.687s.687.308.687.687zm6.27 0c0 .297-.188.559-.47.652-.071.024-.145.036-.218.036-.215 0-.42-.103-.549-.275l-2.669-3.635v3.222c0 .379-.308.688-.688.688-.379 0-.688-.308-.688-.688v-5.209c0-.296.189-.558.47-.652.071-.024.144-.035.218-.035.214 0 .42.103.549.275l2.67 3.635v-3.223c0-.379.309-.687.688-.687s.687.308.687.687zm4.214-3.292c.379 0 .688.308.688.688 0 .379-.308.687-.688.687h-1.917v1.23h1.917c.379 0 .688.308.688.687s-.309.688-.688.688h-2.604c-.378 0-.687-.308-.687-.688v-2.603c0-.001 0-.001 0-.001v-.001-2.601c0-.001 0-.001 0-.002 0-.379.308-.687.687-.687h2.604c.379 0 .688.308.688.687s-.308.687-.688.687h-1.917v1.23h1.917z"
          fill="#fff"
        />
      </svg>
    </Box>
  )
}

export default function Shares({
  emailSubject,
  emailBody,
  url,
}: {
  emailSubject: string
  emailBody: string
  url: string
}) {
  const isDownMd = useBreakpoint('md')
  const theme = useTheme()

  return (
    <Box display="flex" gap="10px" alignItems="center" justifyContent={isDownMd ? 'center' : 'flex-start'}>
      <EmailShareButton
        subject={emailSubject}
        body={emailBody}
        separator=" --- "
        url={url}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <EmailIcon
          fontSize="medium"
          sx={{
            '&:hover': {
              color: theme.palette.primary.main,
            },
          }}
        />
      </EmailShareButton>
      <LineShareButton
        url={url}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <LineIcon />
      </LineShareButton>
      <FacebookShareButton
        url={url}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FacebookIcon
          fontSize="medium"
          sx={{
            '&:hover': {
              color: theme.palette.primary.main,
            },
          }}
        />
      </FacebookShareButton>
      <TwitterShareButton
        url={url}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TwitterIcon
          fontSize="medium"
          sx={{
            '&:hover': {
              color: theme.palette.primary.main,
            },
          }}
        />
      </TwitterShareButton>
    </Box>
  )
}
