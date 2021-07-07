import {Link, Box, Typography} from '@material-ui/core'

export default function Header() {
  return (
    <Box height='140px'>
      <Typography variant='h2'>
      <Link href="/" color="inherit">
        Shareuhack
      </Link>
      </Typography>
    </Box>
  )
}
