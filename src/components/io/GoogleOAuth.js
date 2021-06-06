import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Button, Container, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Popover, TextField } from '@material-ui/core'
import useGlobal from '../../store'
import $ from 'jquery'
import { Google } from 'mdi-material-ui'

export function GoogleOAuth () {    
  const [anchorEl, setAnchorEl] = useState(null)
  const [globalState, globalActions] = useGlobal()
  const open = Boolean(anchorEl)
  const [sheetIdDialogOpen, setSheetIdDialogOpen] = React.useState(false);
  let sheetId = ""
  // function authenticate() {
  //   return window.gapi.auth2.getAuthInstance()
  //       .signIn({scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.photos.readonly https://www.googleapis.com/auth/drive.readonly"})
  //       .then(function() { console.log("Sign-in successful"); },
  //             function(err) { console.error("Error signing in", err); });
  // }
  // function loadClient() {
  //   window.gapi.client.setApiKey("YOUR_API_KEY");
  //   return window.gapi.client.load("https://content.googleapis.com/discovery/v1/apis/drive/v3/rest")
  //       .then(function() { console.log("GAPI client loaded for API"); },
  //             function(err) { console.error("Error loading GAPI client for API", err); });
  // }
  // // Make sure the client is loaded and sign-in is complete before calling this method.
  // function execute() {
  //   return window.gapi.client.drive.files.list({
  //     "q": "name = '23407 matrix'"
  //   })
  //     .then(function(response) {
  //       // Handle the results here (response.result has the parsed body).
  //       console.log("Response", response);
  //     },
  //     function(err) { console.error("Execute error", err); });
  // }




  function authenticate() {
    return window.gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/spreadsheets"})
      .then(function(response) { 
        console.log(response)
        sessionStorage.setItem("WE", response)
        console.log("Sign-in successful"); 
      }, function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    return window.gapi.client.load("https://content.googleapis.com/discovery/v1/apis/sheets/v4/rest").then(function() { 
      console.log("GAPI client loaded for API"); 
      execute() 
    }, function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return setSheetIdDialogOpen(true)
  }

  window.gapi.load("client:auth2", function() {
      window.gapi.auth2.init({client_id: "346253512556-9cll30jrl8c77o4d4vk9md0mk94g8sge.apps.googleusercontent.com"});
  });

  function onClick (event) {
    console.log('clicked here')
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    console.log('thought')
    setAnchorEl(null);
  }

  const handleSubscribe = (sheetId) => {
    handleClose()
    // console.log(sheetId);
    // https://spreadsheets.google.com/feeds/cells/YOURGOOGLESHEETCODE/SHEETPAGENUMBER/public/full?alt=json
   

    setSheetIdDialogOpen(false)
    return window.gapi.client.sheets.spreadsheets.get({
      "spreadsheetId": '1fDA_e9hOI3wsXKB4cW_pElrZL0Lh0aun_cV0BZ3Qhj8',
      "includeGridData": true
    })
    .then(function(response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
    },
    function(err) { console.error("Execute error", err); });
  }

  function getSheet() {
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1fDA_e9hOI3wsXKB4cW_pElrZL0Lh0aun_cV0BZ3Qhj8',
      range: 'Sheet1!A:A',
    }).then(function(response) {
      console.log(response)
      // var range = response.result;
      // if (range.values.length > 0) {
      //   appendPre('Name, Major:');
      //   for (i = 0; i < range.values.length; i++) {
      //     var row = range.values[i];
      //     // Print columns A and E, which correspond to indices 0 and 4.
      //     appendPre(row[0] + ', ' + row[4]);
      //   }
      // } else {
      //   appendPre('No data found.');
      // }
    }, function(response) {
      // appendPre('Error: ' + response.result.error.message);
    });
  }


  const readFile = (fileId,callback) => {
    var request = window.gapi.client.drive.files.get({
      fileId: fileId,
      alt: 'media'
    })
    request.then(function(response){
        console.log(response); //response.body has the text content of the file
        if (typeof callback === "function") callback(response.body); 
    },function(error){
        console.error(error)
    })
    return request; //for batch request
  }


  if (!$.isEmptyObject(globalState.profileToken)) {
    return (
      <>
        <Avatar src={(globalState.profileToken.Pt && globalState.profileToken.Pt.QK) || (globalState.profileToken.Tt && globalState.profileToken.Tt.SK) || (globalState.profileToken.Qt && globalState.profileToken.Qt.MK)} onClick={ onClick} /> 
        <Popover            
          open={open}
          anchorEl={anchorEl}
          // className={classes.popup}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >                      
          {/* <Account /> */}
        </Popover>
      </>
    )
  } else {
    return (      
      <>
        <Container>
          <Button startIcon={<Google />} onClick={()=>{ authenticate().then(loadClient) }} variant="contained">
            Continue with Google
          </Button>
        </Container>
        <Dialog open={sheetIdDialogOpen} onClose={() => setSheetIdDialogOpen(false)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Google Spreadsheet Id</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to the google spreadsheet, please enter sheet Id here. 
            </DialogContentText>
            <TextField
              inputRef={(c) => {sheetId = c}}
              autoFocus
              margin="dense"
              id="sheetId"
              label="Google Sheet Id"              
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSheetIdDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleSubscribe(sheetId)} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}
export default GoogleOAuth
