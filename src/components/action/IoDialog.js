import React, { useState } from 'react'
import { Avatar, Backdrop, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Typography, useMediaQuery } from '@material-ui/core'
import { Box, Flex, Spacer } from "@chakra-ui/react"

export function IoDialog (props) {
    return (
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
                <Box p="4">in-load</Box> :
                <Box p="4">x-load</Box> 
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
    )
}