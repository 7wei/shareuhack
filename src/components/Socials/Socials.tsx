import theme from 'theme/index'
import FacebookIcon from '@mui/icons-material/Facebook'
import EmailIcon from '@mui/icons-material/Email'
import TwitterIcon from '@mui/icons-material/Twitter'
import Link from '../../components/Link/Link'
import { Box } from '@mui/material'

export default function Socials({ primary }: { primary?: boolean }) {
  return (
    <Box display="flex" alignItems="center" gap="8px">
      <Link
        color={primary ? theme.palette.primary.main : theme.palette.primary.contrastText}
        href="https://www.facebook.com/shareuhack/"
        title="Facebook"
        disableHover
        target="_blank"
        type="external"
      >
        <FacebookIcon />
      </Link>
      <Link
        color={primary ? theme.palette.primary.main : theme.palette.primary.contrastText}
        href="https://twitter.com/shareuhack"
        title="Twitter"
        disableHover
        target="_blank"
        type="external"
      >
        <TwitterIcon />
      </Link>
      <Link
        color={primary ? theme.palette.primary.main : theme.palette.primary.contrastText}
        href="mailto:c@shareuhack.com"
        title="Email"
        disableHover
        target="_blank"
        type="external"
      >
        <EmailIcon />
      </Link>
    </Box>
  )
}
