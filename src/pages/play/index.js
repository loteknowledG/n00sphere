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
        cursor: 'pointer'
    },
}));

/*8 88e  888                   
888 888D 888  ,"Y88b Y8b Y888P 
888 88"  888 "8" 888  Y8b Y8P  
888      888 ,ee 888   Y8b Y   
888      888 "88 888    888    
                        888    
                        8*/
export function Play() {
    const [globalState, globalActions] = useGlobal() 
    const classes = useStyles()     
    const [momentIdx, setMomentIdx] = useState(0)
    let pic = globalState.plays[globalState.playIdx].pix[momentIdx]

    function momentNext () {
        if (momentIdx < globalState.plays[globalState.playIdx].pix.length) 
            setMomentIdx(momentIdx + 1)
        else 
            setMomentIdx(0)
        console.log(momentIdx)
    }
    return (<VStack        
        spacing={4}
        align="stretch"
        m={[2, 3]}
      >
        <Paper key={pic.key} className={classes.paper} onClick={() => momentNext()}>
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