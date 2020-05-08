import React from 'react'

import { useSelector } from "react-redux";

import { Grid, List, ListItem, ListSubheader, Paper, Typography, Divider } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
},
  divider: {
    minWidth: 5
  },
  textLeft: {
      textAlign: "left",
      marginLeft: theme.spacing(5)
  }
}));



export default function ClusterVisualizer(props) {

    const currentId = props.choiceId;

    const question = useSelector(state => state.create.questions)

    const classes = useStyles();

    //clustered data
    const clusteredData = useSelector(state => state.analytics.cloudData)

    const clusterList = []

    const parseClusteredData = () => {
        if(Object.keys(clusteredData).length > 0) {
            var index = 0;
            for (var key in clusteredData) {
                clusterList[index] = clusteredData[key];
                ++index;
            }
        }
      }

    const processClusterOne = () => {
        if(clusterList[0] !== undefined && clusterList[0].length > 0)
        return clusterList[0].map((item, index) => (<ListItem button key={index}>
            {item}
        </ListItem>))
    }

    const processClusterTwo = () => {
        if(clusterList[1] !== undefined && clusterList[1].length > 0)
        return clusterList[1].map((item, index) => (<ListItem button key={index}>
            {item}
        </ListItem>))
    }

    const processClusterThree = () => {
        if(clusterList[2] !== undefined && clusterList[2].length > 0)
        return clusterList[2].map((item, index) => (<ListItem button key={index}>
            {item}
        </ListItem>))
    }

    const getQuestion = () => {
        var questionText = "";
        if(question.length > 0) {
            question.map(question => question._id === currentId ? questionText = question.prompt : 0)
            return <div><Typography variant="h4" className={classes.textLeft}>{questionText}</Typography><br/></div>
        }
    }

    return (<div>
        {parseClusteredData()}
        {getQuestion()}
        <Grid container spacing={0}>
            {/* Cluster one */}
            <Grid item xs={4} className={classes.nested}>
            <Divider className={classes.divider} orientation="vertical"/> 
                <List className={classes.root}>
                    <ListSubheader>
                        <Typography variant="h4">Cluster One</Typography></ListSubheader>
                    {processClusterOne()}
                </List>
                
            </Grid>
            {/* Cluster two */}
            <Grid item xs={4} className={classes.nested}>
            <Divider className={classes.divider} orientation="vertical"/> 
                <List className={classes.root}>
                    <ListSubheader><Typography variant="h4">Cluster Two</Typography></ListSubheader>
                    {processClusterTwo()}
                </List>
                
            </Grid>
            {/* Cluster three */}
            <Grid item xs={4} className={classes.nested}>
            <Divider className={classes.divider} orientation="vertical"/> 
                <List className={classes.root}>
                    <ListSubheader><Typography variant="h4">Cluster Three</Typography></ListSubheader>
                    {processClusterThree()}
                </List>
                
            </Grid>
        </Grid>
    </div>);
}