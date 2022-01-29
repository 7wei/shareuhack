import { useAmp } from 'next/amp'
import { Typography, useTheme } from '@mui/material'
import { formattedDate } from '../../src/utils'
import useBreakpoint from '../../src/hooks/useBreakpoint'
import PostBody from '../../src/components/Post/PostBody'
import { Button, Box } from '@mui/material'

export const config = { amp: 'hybrid' }

export default function AmpPost({ post }: { post: any }) {
  const isDownMd = useBreakpoint('md')
  const isAmp = useAmp()
  const theme = useTheme()

  return (
    <>
      <Typography component="h1" variant="h1" mt={8} sx={{ wordWrap: 'break-word' }}>
        {post.title}
      </Typography>
      <Typography color={theme.palette.text.secondary} mt="15px" mb="15px">
        Updated at {formattedDate(post.updatedAt)}
      </Typography>
      {isAmp && (
        <amp-img
          title={post.title}
          alt={post.excerpt}
          src={post.coverImage}
          height={isDownMd ? 172 : 627}
          width={isDownMd ? 330 : 1200}
          layout={'responsive'}
        />
      )}
      <PostBody content={post.content.slice(0, 500) + '......'} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 48,
        }}
      >
        <Button variant="contained" sx={{ fontWeight: 500, fontSize: 18 }} href={'/posts/' + post.slug}>
          點此繼續閱讀
        </Button>
      </Box>
    </>
  )
}
