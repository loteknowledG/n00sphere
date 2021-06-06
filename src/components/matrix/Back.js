import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ArrowLeft } from 'mdi-material-ui'
import { Fab } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  back: {
    position: 'fixed',
    top: theme.spacing(3),
    left: theme.spacing(3),
  }
}))

export function Back () {  
  const classes = useStyles();
  return (
    <>
      <Link to={"/nowPlaying"} style={{ textDecoration: 'none' }}>
        <Fab aria-label="back" className={classes.back}>
          <ArrowLeft />
        </Fab>
      </Link>
    </>  
  )
}
export default Back