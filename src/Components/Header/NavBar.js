import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import SurveyIcon from '@material-ui/icons/Assignment';
import AnalyticsIcon from '@material-ui/icons/Assessment';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Route, Link, Redirect } from 'react-router-dom';

//redux
import {useSelector, useDispatch} from 'react-redux';
import * as actionTypes from '../../store/actions/actions'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.primary.paper,
  },
  searchIcon: {
    padding: theme.spacing(0, 10),
  },
  gradient: {
    background: 'linear-gradient(45deg, #644e5b 30%, #314455 90%)',
    textAlign: "center",
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();

  const pageIndex = useSelector(state => state.appWide);

  const dispatch = useDispatch();

  /*
    We could also use the current pages url to evaluate which value to switch to

    FIXME: this will do a dispatch
  */
  const handleChange = (event, newValue) => {
    dispatch(actionTypes.switchPage(newValue));
    //setValue(newValue);
  };


  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.gradient} >
        <Toolbar>
          <div>
          <Tabs
          //value should now be a useSelector or someshit
            value={pageIndex.page_index}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            aria-label="scrollable force tabs example"
          >
            {/*Tabs show the icons*/ }
            <Tab label="Home" to="/home" component={Link} icon={<HomeIcon />} {...a11yProps(0)} />
            <Tab label="Survey Creation" to="/create" component={Link} icon={<SurveyIcon />} {...a11yProps(1)} />
            <Tab label="Analytics" to="/analytics" component={Link} icon={<AnalyticsIcon />} {...a11yProps(2)} />
            <Tab label="Log Out" to="/login" component={Link} icon={<ExitToAppIcon />} {...a11yProps(3)}/>
          </Tabs>
          </div>
          {/* {(
            <div className={classes.searchIcon}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true" 
                color="inherit"
                edge="end"
              >
                <AccountCircle />
              </IconButton>
              </div>
          )} */}
          </Toolbar>
      </AppBar>
    </div>
  );
}