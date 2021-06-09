import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import useGlobal from '../../store'
import { VStack } from "@chakra-ui/react"
import Image from 'material-ui-image'
import { Back } from './Back'
import { IO } from '../../components/io'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


export function Play() {
    const [globalState, globalActions] = useGlobal() 
    const classes = useStyles()     
    const [momentIdx, setMomentIdx] = useState(0)
    console.log(globalState.plays, globalState.playsIdx)
    let pic = globalState.plays[globalState.playsIdx].pix[momentIdx]
    return (<VStack        
        spacing={4}
        align="stretch"
        m={[2, 3]}
      >
        
          
            <Paper key={pic.key} className={classes.paper}>
                <Image src={pic.src}/>
            </Paper>))
        

        {/* {globalState.plays[globalState.mainStageIdx].pix.map(pic => {
            return (
                <Paper key={pic.key} className={classes.paper}>
                    <Image src={pic.src}/>
                </Paper>)
        })}  */}
        <Back />  
        <IO />          
      </VStack>)    
}
export default Play