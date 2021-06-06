import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardMedia, Grid } from '@material-ui/core'
import { ArrowLeft } from 'mdi-material-ui'
import useGlobal from '../../store'
import { Back } from './Back'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '25px'
  },
  drag: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    height: '10%',
    width: '10%',
  },
  media: {
    height: 345,
    objectFit: 'cover'
    // paddingTop: '56.25%', // 16:9
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'grey'
  },
  paper: {
    height: 345,
    width: 345,
  }, 
  title: {
    flexGrow: 1,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  brandText: {
    flexGrow: 1,
    fontFamily: 'monospace',
    fontSize: 7,
    marginBotton: 7,
    position: 'relative',
    whiteSpace: 'pre'
  },
  neon: {
    color: 'whitesmoke',
    textShadow:
      '0 0 3px #9D33FF,' +
      '0 0 5px #9D33FF,' +
      '0 0 10px #9D33FF,' +
      '0 0 20px #9D33FF,' +
      '0 0 40px #9D33FF,' +
      '0 0 50px #9D33FF'   
  },
}))
     /*   e                  d8          ,e,          
    d8b  d8b       /~~~8e  _d88__ 888-~\  "  Y88b  /  
   d888bdY88b          88b  888   888    888  Y88b/   
  / Y88Y Y888b    e88~-888  888   888    888   Y88b   
 /   YY   Y888b  C888  888  888   888    888   /Y88b  
/          Y888b  "88_-888  "88_/ 888    888  /  Y8*/ 
export function Matrix() {
  
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()
  let history = useHistory()
  if (globalState.matrix.length === 0) {    
    history.push("/")
  }
  const constraintsRef = useRef()

  if (globalState.now.play) {
    return (    
      <>
        <Grid container className={classes.root} spacing={2} ref={constraintsRef}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {globalState.now.play.pix.map((pic) => (
                <Grid key={pic.key} item>
                  <Card className={classes.paper} onClick={() => {
                    globalActions.setTuning(pic)
                    history.push("/tuning")
                  }}>
                    <CardMedia
                      className={classes.media}
                      image={pic.src}                  
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        
        <Back/>
      </>
    )
  }
  return (null)
}

export default Matrix