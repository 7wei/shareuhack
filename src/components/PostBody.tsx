import { makeStyles } from '@material-ui/core'
import theme from 'theme'
import * as markdownStyles from '../styles/markdown-styles.module.css'

export default function PostBody({ content }: { content: string }) {
  return (
    <div>
      <div className={markdownStyles['markdown']} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
