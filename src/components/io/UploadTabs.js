import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { AppBar, Box, Button, Tab, Tabs, TextField } from '@material-ui/core'
import {useDropzone} from 'react-dropzone'
import useGlobal from '../../store'
import { v4 as uuidv4 } from 'uuid'
import { GoogleOAuth } from './GoogleOAuth'
import { useRouter } from 'next/router'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 654,
  },  
}))

export function UploadTabs(props) {
  const router = useRouter()
  const classes = useStyles()
  const theme = useTheme()
  const [fileValue, setFileValue] = useState('')
  const [globalState, globalActions] = useGlobal()  
  const [showExecute, setShowExecute] = useState(false)
  const [textareaValue, setTextareaValue] = useState('')      
  const [value, setValue] = React.useState(0)

  useEffect(() => {
    if (fileValue === '' || fileValue === undefined) {}
    else if (fileValue.matrix) {
      globalActions.setMatrix(fileValue.matrix)
      props.handleUploadClose()        
    }
    // else {      
    //   // globalActions.addLevel(fileValue)
    //   router.push({
    //     pathname: '/play',
    //     // query: { pid: post.id },
    //   })
    //   // history.push('/level')
    // }
  }, [fileValue]) 
  
  function Dropzone() {  
    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          // Do whatever you want with the file contents
          setFileValue(JSON.parse(reader.result ))
          props.handleUploadClose()
          props.handleSpeedDialClick()
        }
        reader.readAsText(file)
      })
    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop})
    return (
      <div {...getRootProps()}>        
        <input {...getInputProps()} />
        Drag 'n' drop some Matrix files here, or click to select files            
      </div>
    )
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  }

  const handleCollateHtml = () => {    
    if (textareaValue) {       
      const gifs = textareaValue.split(',')
        .filter(gif => gif.includes('https://lh3'))
        .map(gif => '"' + gif.replace(/(\["|")/g, '').replace(/(\r\n\t|\n|\r\t)/gm, "") + '"')      
      globalActions.setMainStageIdx(globalState.plays.length)
      const play = {}
      play.key = uuidv4()
      play.pix = JSON.parse('{ "pix": [' + gifs  + ']}').pix.map((moment) => {
        return {key: uuidv4(), src: moment}
      })
      play.cover = play.pix[0].src
      globalActions.addPlay(play)
      console.log(play.pix)
      props.handleUploadClose()
      props.handleSpeedDialClick()      
      router.push('/mainStage')
    }
  }

  const keyDownJsonUrl = (event) => {    
    if (event.keyCode === 13) {
      let jsonUrl = event.target.value
      fetch(jsonUrl).then(function(response) {
        return response.json()
      }).then(function(data) {
        if (jsonUrl.includes('spreadsheets.google.com')) {
          const play = {}
          play.key = uuidv4()          
          // play.pix = data.feed.entry.map((entry) => {
          //   return {key: uuidv4(), src: entry.content.$t}
          // })          
          

          Promise.all(data.feed.entry.map((entry) => {
            return {key: uuidv4(), src: entry.content.$t}
          })) 
          .then(() => {play.cover = play.pix[0].src})

          globalActions.addPlay(play)
          props.handleDialogClose()
          props.handleSpeedDialClick()      
          router.push('/play')
        }        
      })
    }
  }

  const textAreaChange = (event) => {
    if (event.target.value.trim().length > 0) {
      setShowExecute(true)
    }    
    else {
      setShowExecute(false)
    }
    setTextareaValue(event.target.value.trim())
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example">
          <Tab label="Collect Json Endpoint" {...a11yProps(0)} />
          <Tab label="Compile HyperText" {...a11yProps(1)} />
          <Tab label="Collate STC" {...a11yProps(2)} />
          <Tab label="Correlate Sheet" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex} >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <TextField 
            id="outlined-search" 
            label="universal resourse identifier"                       
            onKeyDown={keyDownJsonUrl} 
            fullWidth            
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TextField
            multiline
            rows={7}
            value={textareaValue}
            onChange={textAreaChange}
            label='copy paste fractal matrix'  
            margin='normal'
            variant='outlined'
            spellCheck='false'
            fullWidth/>
            { showExecute ? <Button onClick={() => { handleCollateHtml()} } color="primary">Execute</Button> : null }
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Dropzone margin="normal" /> 
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction} >          
          <GoogleOAuth /> 
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
export default UploadTabs