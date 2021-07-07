import { Link, Typography } from '@material-ui/core'
import Container from './Container'

export default function Header() {
  return (
    <Container>
      <Typography variant="h2">
        <Link href="/" color="inherit">
          Shareuhack
        </Link>
      </Typography>
    </Container>
  )
}
