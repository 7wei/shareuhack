import { Link, Typography } from '@material-ui/core'
import Container from './Container'
import { TYPE } from 'theme/index'

export default function Header() {
  return (
    <Container>
      <TYPE.brand>
        <Link href="/" color="inherit" underline="none">
          Share.U.Hack
        </Link>
      </TYPE.brand>
    </Container>
  )
}
