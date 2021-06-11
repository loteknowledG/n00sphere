import React, { useState } from 'react'
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { VStack } from "@chakra-ui/react"
import { NoteMultipleOutline  } from 'mdi-material-ui'

export function Navigator() {    
    const [drawerOpen, setDrawerOpen] = useState(false)
    return (
        <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer anchor={'left'} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                <ListItemIcon>
                    <NoteMultipleOutline />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                </ListItem>
                
            </List>
            </Drawer>
        </>)
}

export default Navigator