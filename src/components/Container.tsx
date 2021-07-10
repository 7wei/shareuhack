import React from 'react'
import { Container as MuiContainer, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    maxWidth: 1024,
  },
})

export default function Container({ children }: { children: any }) {
  const classes = useStyles()
  return <MuiContainer className={classes.root}>{children}</MuiContainer>
}
