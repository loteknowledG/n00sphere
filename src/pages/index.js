import React, { useState } from 'react';
import { Container } from '@chakra-ui/react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { AppBar, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { IO } from '../components/io'
import { NowPlaying } from '../components/nowPlaying'
import { Navigator } from '../components/navigator'
import { NoteMultipleOutline  } from 'mdi-material-ui'


const useStyles = makeStyles((theme) => ({
  brandText: {
    flexGrow: 1,
    fontFamily: 'monospace',
    fontSize: 7,
    position: 'relative',
    whiteSpace: 'pre',
    color: 'whitesmoke',
    textAlign: 'center',
    textShadow:
      '0 0 3px #9D33FF,' +
      '0 0 5px #9D33FF,' +
      '0 0 10px #9D33FF,' +
      '0 0 20px #9D33FF,' +
      '0 0 40px #9D33FF,' +
      '0 0 50px #9D33FF'   
  },  
}))

function Home() {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)
  function onClick(e) {
    fetch('https://spreadsheets.google.com/feeds/cells/1TgdLq4SCh1_GrOyDXfdL7WtOYIt8AI-PH4tLeJAD1jc/1/public/full?alt=json')
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
  
        // Examine the text in the response
        response.json().then(function(data) {
          console.log(data);
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }
  return (
    <Container>
      <AppBar color="transparent" elevation={0}>
        <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
<pre className={classes.brandText}> 
888b    |   ,88~~\     ,88~~\                    888                                <br/> 
|Y88b   |  d888   \   d888   \   d88~\ 888-~88e  888-~88e  e88~~8e  888-~\  e88~~8e <br/>
| Y88b  | 88888    | 88888    | C888   888  888b 888  888 d888  88b 888    d888  88b<br/>
|  Y88b | 88888    | 88888    |  Y88b  888  8888 888  888 8888__888 888    8888__888<br/>
|   Y88b|  Y888   /   Y888   /    888D 888  888P 888  888 Y888    , 888    Y888    ,<br/>
|    Y888   `88__/     `88__/   \_88P  888-_88"  888  888  "88___/  888     "88___/ <br/>
|                                      888                                          <br/>                      
</pre>
        </Toolbar>
      </AppBar>
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
      <NowPlaying />
      <IO />      
    </Container>
  )
}

export default Home
