import { Breadcrumbs as MuiBreadcrumbs, makeStyles, Theme } from '@material-ui/core/'
import React from 'react'

interface Props {
  children?: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: '15px',
  },
  ol: {},
  li: {
    '& a': { color: theme.textColor.text2 },
    '&:last-child a': { color: theme.textColor.text1 },
  },
  separator: {
    color: theme.textColor.text3,
  },
}))

export default function Breadcrumbs(props: Props) {
  const classes = useStyles()
  const { children } = props
  return <MuiBreadcrumbs classes={{ ...classes }}>{children}</MuiBreadcrumbs>
}
