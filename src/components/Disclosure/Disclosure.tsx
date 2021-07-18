import { Link } from '@material-ui/core'
import { TYPE } from 'theme/index'
import { Routes } from '../../../lib/constants'

export default function Disclosure() {
  return (
    <TYPE.primary textAlign="center" fontSize="14px" mb="48px">
      Shareuhack是仰賴用戶支持而持續產生內容的，當您透過網站內的連結購買商品或課程，我們可能因此收益。
      <Link href={Routes.about} underline="always">
        了解更多
      </Link>
    </TYPE.primary>
  )
}
