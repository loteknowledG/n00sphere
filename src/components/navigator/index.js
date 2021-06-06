import React, { useState } from 'react'
import { Drawer, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

export function Navigator() {    
    const [drawerOpen, setDrawerOpen] = useState(false)
    return (
        <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
            </IconButton>
            <Drawer anchor={'left'} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                100% benefit
            </Drawer>
        </>)
}

export default Navigator