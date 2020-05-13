import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {useSelector, useDispatch} from 'react-redux'
import * as triggerStrings from '../triggerTypesModal/triggerTypeStrings'
import * as createActions from '../../../store/actions/surveyActions'

export default function TriggerModal(props) {
    //probably take in a prop that opens or closes. 

  const triggerSetting = useSelector(state => state.create.triggers);

  const dispatch = useDispatch();

  const { open, onClose } = props

  const handleClose = () => {
    onClose();
  }

  const [defText, setDefText] = React.useState("Pop up in x seconds");

  const changeValue = (val) => {
    if(val === triggerStrings.TIMER)
    setDefText("Pop up in x seconds")
    else 
    setDefText("Scroll percentage")

    triggerSetting[0] = {
      ...triggerSetting[0],
      triggerType: val
    }
  }

  const updateTrigger = () => {

    var triggerObject; 
    console.log(triggerObject)

    if(triggerSetting[0].triggerType === triggerStrings.SCROLL)
      triggerObject = [{
        triggerType: document.getElementById("trigger_type").value,
        scrollPercent: document.getElementById("trigger_extra").value,
        _id : triggerSetting[0]._id === undefined ? null : triggerSetting[0]._id
      }]
    else 
      triggerObject = [{
        triggerType: document.getElementById("trigger_type").value,
        timer: (document.getElementById("trigger_extra").value * 1000),
        _id : triggerSetting[0]._id === undefined ? null : triggerSetting[0]._id
      }]

    console.log(triggerObject)

    dispatch(createActions.updateTrigger(triggerObject));
    onClose();
  }

  const getTriggerValue = () => {
    if(triggerSetting[0].triggerType === triggerStrings.SCROLL)
      return triggerSetting[0].scrollPercent
    else
      return triggerSetting[0].timer/1000
  }

  

    return (<div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Trigger</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose a trigger to pop your survey
          </DialogContentText>
          <Select
            fullWidth
            autoFocus
            defaultValue={triggerSetting[0] === null ? triggerStrings.TIMER: triggerSetting[0].triggerType}
            id='trigger_type_select'
            inputProps={{
                name: 'trigger_type',
                id: 'trigger_type',
            }}
            onClick={(e) => changeValue(e.target.value)}
            >
            <MenuItem value={triggerStrings.TIMER}>Timer Trigger</MenuItem>
            <MenuItem value={triggerStrings.SCROLL}>Scroll Trigger</MenuItem>
          </Select>
        </DialogContent>
        <DialogContent>
        <TextField
          autoFocus
          id="trigger_extra"
          label={defText}
          fullWidth
          defaultValue={triggerSetting[0] === null ? 10 : getTriggerValue()}
          inputProps = {{
            maxLength: 3,
          }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateTrigger} color="primary">
            Set Trigger
          </Button>
        </DialogActions>
      </Dialog>
    </div>);
}