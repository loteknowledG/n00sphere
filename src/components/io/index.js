import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Backdrop, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Typography, useMediaQuery } from '@material-ui/core';
import { SpeedDial, SpeedDialIcon, SpeedDialAction} from '@material-ui/lab'
import { Account, ArrowDownThick, ArrowUpThick, Draw, Elevator, Plus, SafeSquareOutline, SafeSquare} from 'mdi-material-ui'
import { useTheme } from '@material-ui/core/styles'
import { IoTabs } from './IoTabs'
import { DownloadTabs } from './DownloadTabs'
import useGlobal from '../../store'
import Switch from "react-switch"
import { Box, Flex, Spacer } from "@chakra-ui/react"

// import exportFromJSON from 'export-from-json'

const plays = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  a: {
    display: 'none'
  },
  inload: {
    paddingBottom: 7,
    paddingLeft : 7
  },
  switch: {
    right: theme.spacing(2),
  },
  title: {
    flex: 1,
  }
}));

const actions = [
  { icon: <Elevator />, name: 'IO' },
  { icon: <Draw />, name: 'Create' },
  
];

/*__  
|/  \ 
|\_*/

export function IO () {
  const theme = useTheme();
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [speedDialOpen, setSpeedDialOpen] = useState(false)
  const [ioOpen, setIoOpen] = useState(false)
  const [isDownload, setIsDownload] = useState(true)
  const [downloadOpen, setDownloadOpen] = useState(false)

  // const [isDown, setIsDown] = useState(true)
  // const [downloadHidden, setDownloadHidden] = useState(false)
  const [globalState, globalActions] = useGlobal() 
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [checked, setChecked] = useState(false)
  

  const handleSpeedDialClick = () => {
    setSpeedDialOpen(!speedDialOpen);
  };

  const handleSpeedDialAction = (actionName) => {
    
    if (actionName === 'IO') {
      setIoOpen(true)
    } else if (actionName == 'Create') {
      setDownloadOpen(true)
      // var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storageObj));
      // var dlAnchorElem = document.getElementById('downloadAnchorElem');
      // dlAnchorElem.setAttribute("href",     dataStr     );
      // dlAnchorElem.setAttribute("download", "scene.json");
      // dlAnchorElem.click();
      // const fileName = 'download'
      // const plays = globalState.plays
      // console.log(plays)
      // const exportType = 'csv'
      // exportFromJSON({ plays , fileName, exportType })
     
    }
  }

  const handleSwitchChange = (checked) => {
    setChecked(checked)
  }

  return (
    <div className={classes.root}>
      <a id="downloadAnchorElem" className={classes.a}></a>
      <Backdrop open={speedDialOpen} />
      <SpeedDial
        ariaLabel="Safe"
        className={classes.speedDial}
        icon={<SpeedDialIcon icon={<SafeSquareOutline />} openIcon={<SafeSquare />} />}
        onClick={handleSpeedDialClick}
        open={speedDialOpen} >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={(e) => {
              e.stopPropagation();
              handleSpeedDialAction(action.name)
            }}
          />
        ))}
      </SpeedDial>      
      <Dialog
        id="IoDialog"
        fullScreen={fullScreen}
        maxWidth={'md'}
        open={ioOpen}
        onClose={()=>setIoOpen(false)}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title" >
        <Flex>
          { checked ? 
            <Box p="4">Pick Inload mechanism</Box> :
            <Box p="4">Pick Xload mechanism</Box> }
          <Spacer />
          <Box p="4">
            <Switch className={classes.switch} onChange={handleSwitchChange} checked={checked} checkedIcon={<ArrowDownThick className={classes.inload}/>} uncheckedIcon={<ArrowUpThick className={classes.inload} />} onColor='#d76798' offColor='#b267d7' />         
          </Box>
        </Flex>
          
          
        </DialogTitle>        
        <DialogContent>
          <IoTabs handleIodClose={()=>setIoOpen(false)} handleSpeedDialClick={() => handleSpeedDialClick()} />          
        </DialogContent>
        
        {/* <DialogActions>          
          <Button autoFocus onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
      <Dialog
        id="downloadDialog"
        fullScreen={fullScreen}
        maxWidth={'md'}
        open={downloadOpen}
        onClose={()=>setDownloadOpen(false)}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          Choose Play to Download  
        </DialogTitle>
        <DialogContent>
        <List>
        {plays.map((play) => (
          <ListItem button onClick={() => (play)} key={play}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <Account />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={play} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <Plus />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>          
        </DialogContent>
        <DialogActions>          
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default IO
