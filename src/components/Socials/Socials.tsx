import theme from 'theme/index'
import FacebookIcon from '@mui/icons-material/Facebook'
import EmailIcon from '@mui/icons-material/Email'
import Link from '../../components/Link/Link'
import { Box } from '@mui/material'

export default function Socials({ primary }: { primary?: boolean }) {
  return (
    <Box display="flex" alignItems="center" gap="8px">
      <Link
        color={primary ? theme.palette.primary.main : theme.palette.primary.contrastText}
        href="https://www.facebook.com/shareuhack/"
        title="Shareuhack|Facebook Page"
        disableHover
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <FacebookIcon fontSize="small" />
      </Link>
      <Link
        color={primary ? theme.palette.primary.main : theme.palette.primary.contrastText}
        href="mailto:c@shareuhack.com"
        title="Shareuhack|Contact Email"
        disableHover
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <EmailIcon fontSize="small" />
      </Link>
    </Box>
  )
}
