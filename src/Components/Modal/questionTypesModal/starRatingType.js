import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {useDispatch,useSelector} from 'react-redux'
import * as surveyActions from '../../../store/actions/actions'
import * as questionTypes from '../questionTypesModal/questionTypeStrings'


export default function StarRating(props) {

    const [stars, setStars] = React.useState(5);

    const currentQArray = useSelector(state => state.create.questions);

    const dispatch = useDispatch();

    const handleChange = val => {
        setStars(val);
        dispatch(surveyActions.getQuestionType(questionTypes.STAR, val))
      };

      let choicesArray = undefined;

      const loadValues = () => {
          choicesArray = getValues();
      }
  
      const getValues = () => {
          if(props.qID !== undefined) {
              for (var i=0; i < currentQArray.length; i++) {
                  if (currentQArray[i].questionId === props.qID) {
                      return currentQArray[i];
                  }
              }
          } 
      }  

    return(<div>
      {loadValues()}
        <InputLabel id="demo-customized-select-label" fullWidth>Choose number of stars: </InputLabel>
        <Select
          id="maxStars_text"
          fullWidth
          defaultValue={choicesArray === undefined ? 5 : choicesArray.maxStars}
          onClick={e => handleChange(e.target.value)}
        >
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
    </div>);
}