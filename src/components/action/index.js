import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Avatar, Backdrop, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import { SpeedDial, SpeedDialIcon, SpeedDialAction} from '@material-ui/lab'
import { Account, ArrowDownThick, ArrowUpThick, Draw, Elevator, Plus, WindowClose } from 'mdi-material-ui'
import { useTheme } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide';
import { IoTabs } from './IoTabs'
import useGlobal from '../../store'
import Switch from "react-switch"
import { Box, Flex, Spacer } from "@chakra-ui/react"
import { Dropzone } from './Dropzone'

import CloseIcon from '@material-ui/icons/Close';

const plays = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    position: 'relative',
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

  /*_____  __________ _________ __________________ ___    __ 
 /   O   \/   /_____//__     __\\__/ \__/    O    \   \  |  |
/___/%\___\___\%%%%%'`%%|___|%%'_`%\_/%'\_________/____\_|__|
`BB'   `BB'`BBBBBBBB'    `B'    `BBBBBBB'`BBBBBBB' `BBBBBB*/ 
export function Action () {
  const theme = useTheme()
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [speedDialOpen, setSpeedDialOpen] = useState(false)
  const [ioOpen, setIoOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)  
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
    } else if (actionName === 'Create') {
      setCreateOpen(true)
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
        icon={<SpeedDialIcon icon={<SpeedDialIcon />} openIcon={<WindowClose />}/>}
        onClick={handleSpeedDialClick}
        open={speedDialOpen} >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={(e) => {
              e.stopPropagation();
              handleSpeedDialAction(action.name)
            }}
          />
        ))}
      </SpeedDial>      
      <Dialog
        id="IoDialog"
        maxWidth={'md'}
        open={ioOpen}
        onClose={()=>setIoOpen(false)}
        aria-labelledby="io">
        <DialogTitle id="io" >
          <Flex>
            { checked ? 
              <Box p="4">Inload</Box> :
              <Box p="4">Xload</Box> 
            }
            <Spacer />
            <Box p="4">
              <Switch className={classes.switch} onChange={handleSwitchChange} checked={checked} checkedIcon={<ArrowDownThick className={classes.inload}/>} uncheckedIcon={<ArrowUpThick className={classes.inload} />} onColor='#d76798' offColor='#b267d7' />         
            </Box>
          </Flex>
        </DialogTitle>    
        { checked ?
          <DialogContent>
            <IoTabs handleIodClose={()=>setIoOpen(false)} handleSpeedDialClick={() => handleSpeedDialClick()} />          
          </DialogContent> : 
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
         }    
      </Dialog>

      <Dialog
        id="CreateDialog"
        fullScreen 
        open={createOpen} 
        onClose={()=>setCreateOpen(false)} 
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={()=>setCreateOpen(false)} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Create
            </Typography>
            <Button autoFocus color="inherit" onClick={()=>setCreateOpen(false)}>
              save
            </Button>
          </Toolbar>
        </AppBar><br/>
        <TextField id="title" label="Title" variant="outlined" autoComplete='off' type='text' /><br/>
        <TextField
          id="text"
          label="Text"
          placeholder="Text"
          multiline
          variant="outlined"
        />
        <Dropzone />

      </Dialog>
    </div>
  );
}
export default Action
