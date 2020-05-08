import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider'


const useStyles = makeStyles(theme => ({
  textfield: {
    textAlign: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  gradient: {
    minHeight: 200,
    background: 'linear-gradient(45deg, #644e5b 30%, #314455 90%)',
    textAlign: "center",
  },
  divider: {
    minHeight: 2
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.gradient}> 
      <Container maxWidth="md">
          <Typography variant="h1" className={classes.textfield} >
            Guerrilla Surveys
          </Typography>
          <Divider className={classes.divider}/>
          <Typography 
          variant="overline" 
          className={classes.textfield}
          display="block" 
          gutterBottom>
            Create. Design. Manage
          </Typography>
        </Container>
      </AppBar>
    </div>
  );
}