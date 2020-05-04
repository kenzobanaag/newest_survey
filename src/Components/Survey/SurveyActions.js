

import React from 'react';
import QuestionModal from '../Modal/QuestionModal';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TriggerModal from '../Modal/triggerTypesModal/triggerModal'

//redux
import { useDispatch, useSelector } from "react-redux";
import * as surveyActions from '../../store/actions/surveyActions'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(5),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  marginAlign: {
    marginLeft: theme.spacing(1),
  },
  noStyle: {
    textAlign: 'left',
    listStyle: 'none',
    marginLeft: theme.spacing(1),
    padding: '0',
  },
}));

/*
    param: props.surveyId
           props.dateCreated
           props.publishedStatus
*/
export default function SurveyActions(props) {

  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.authToken)

  const newSurveyObject = useSelector(state => state.create)

  const [reqHelperText, setReqHelperText] = React.useState("");

  const [isError, setIsError] = React.useState(false);

  const handleOnTextChange = () => {
    setReqHelperText("");
    setIsError(false);
  }

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [triggerOpen, setTriggerOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
  };

  const handleTriggerOpen = () => {
    setTriggerOpen(true)
  }

  const handleTriggerClose = () => {
    setTriggerOpen(false)
  }

  //could be improved....
  const isPopulated = (surveyObject) => {
    if(surveyObject.title.length) {
      return false;
    }
    if(surveyObject.questions.length) {
      return false;
    }
    return true;
  }

  return (
    <Paper className={classes.root}>
      <React.Fragment>
            <TextField
            error={isError}
            id="surveyName"
            className={classes.textField}
            margin="normal"
            fullWidth
            variant="outlined"
            label="Survey Name"
            helperText={reqHelperText}
            value={newSurveyObject.title === undefined ? "": newSurveyObject.title}
            onChange={() => dispatch(surveyActions.updateTitle(
            newSurveyObject.title = document.getElementById("surveyName").value))
              }
          />
       </React.Fragment>
      <React.Fragment>
            <Typography variant="h6" gutterBottom>
            <ul className={classes.noStyle}>
          <li>Date Created: <span>{newSurveyObject.creationDate}</span></li>
          <li>Published Status: <span style={{color: 'red'}}>{newSurveyObject.isPublished}</span></li>
              <li>Survey ID: <span>{newSurveyObject.surveyId}</span></li>
            </ul>
          </Typography>
      </React.Fragment>

      <React.Fragment>
            <Grid container spacing={1} direction="column" alignItems="flex-start">
        <Grid item>
            <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={true}
            className={classes.marginAlign}
            >Publish</Button>
            <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={isPopulated(newSurveyObject)}
            className={classes.marginAlign}
            onClick={() => dispatch(surveyActions.saveSurvey(newSurveyObject,currentUser))}
            >Save</Button>
        </Grid>
        <Grid item>     
            <Button 
            onClick={handleClickOpen}
            variant="contained"
            color="secondary"
            size="large"
            className={classes.marginAlign}
            >Add Question
            </Button>
            <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleTriggerOpen}
            disabled={isPopulated(newSurveyObject)}
            className={classes.marginAlign}>Configure Trigger</Button>
            <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => dispatch(surveyActions.getEmbed(newSurveyObject.surveyId))}
            disabled={isPopulated(newSurveyObject)}
            className={classes.marginAlign}>Get Embeddable Code</Button>
        </Grid>
      </Grid>
      </React.Fragment>
          <QuestionModal open={open} onClose={handleClose} buttonText="Add"/>
          <TriggerModal open={triggerOpen} onClose={handleTriggerClose}/>
    </Paper>
  );
}