//Probably configure the routing stuff here.
//navbar will be static on top
import React from 'react';
import NavBar from '../Header/NavBar'
import LoginPage from '../Login/loginPage'
import {createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import PageContainer from './PageContainer'

// const theme = createMuiTheme({
//     palette: {
//       primary: {main: '#981E32'},
//       secondary: { main: '#53565A'}
//     },
//   });


const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#644e5b",
        light: "#c2c5cc"
      },
      secondary: {
          main: "#314455"
      }
    },
  });

const container = () => {
    return(
        <div className="">
            <MuiThemeProvider theme={theme}>
              <PageContainer/>
                {/* <LoginPage/>
                <NavBar/> */}
            </MuiThemeProvider>
        </div>
    );
}

export default container;