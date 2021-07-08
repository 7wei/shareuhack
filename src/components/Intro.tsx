import { TYPE } from 'theme/index'
import { Box } from '@material-ui/core'

export default function Intro() {
  return (
    <Box height="70px" display="flex" alignItems="center" justifyContent="center">
      <TYPE.primary textAlign="center">我們熱衷於研究、分享實用的知識、生活密技，幫助你成為LifeHacker！</TYPE.primary>
    </Box>
  )
}
