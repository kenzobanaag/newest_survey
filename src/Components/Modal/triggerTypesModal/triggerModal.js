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

import {useSelector} from 'react-redux'
import * as triggerStrings from '../triggerTypesModal/triggerTypeStrings'

export default function TriggerModal(props) {
    //probably take in a prop that opens or closes. 

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
  }

  const triggerSetting = useSelector(state => state.create.triggers);

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
            defaultValue={triggerSetting === undefined ? triggerStrings.TIMER : triggerStrings.TIMER}
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
          defaultValue={10}
          inputProps = {{
            maxLength: 2,
          }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Set Trigger
          </Button>
        </DialogActions>
      </Dialog>
    </div>);
}