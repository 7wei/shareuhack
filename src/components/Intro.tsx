import { TYPE } from 'theme/index'
import { Box } from '@material-ui/core'

export default function Intro() {
  return (
    <Box height="70px" display="flex" alignItems="center" justifyContent="center">
      <TYPE.primary textAlign="center">我們熱衷於分享所有最好的知識、密技，幫助你成為生活黑客！</TYPE.primary>
    </Box>
  )
}
