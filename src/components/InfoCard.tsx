import React from 'react'
import { makeStyles } from '@material-ui/core'
import theme from 'theme/index'

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.primary.light,
    padding: 15,
    marginBottom: 15,
  },
})

export default function InfoCard({ children }: { children: React.ReactNode }) {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}
