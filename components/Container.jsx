import { Container as MuiContainer } from '@material-ui/core'

export default function Container({ children }) {
  return <MuiContainer maxWidth="md">{children}</MuiContainer>
}
