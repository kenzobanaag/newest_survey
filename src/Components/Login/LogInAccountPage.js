import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import RegisterModal from '../Login/RegisterModal'
import Link from '@material-ui/core/Link';
// Router
import { useHistory } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import APICalls from '../Axios/ApiCall'
import * as userActions from '../../store/actions/userActions'

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: "center",
        marginTop: theme.spacing(3),
    },
    topMargin: {
        marginTop: theme.spacing(2),
        width: 450,
        textAlign: "center",
    },
    register: {
        marginTop: theme.spacing(2),
        textAlign: "center",
    }
  }));

export default function LogInPage() {
    const classes = useStyles();

    const [hide, setHidden] = React.useState(true);

    const [error, setError] = React.useState(false);
  
    const [errorText, setErrorText] = React.useState("");
  
    const [values, setValues] = React.useState({
      password: '',
      showPassword: false
    });

    const [open, setOpen] = React.useState(false);

    const handleClose = value => {
      setOpen(false);
    };
  
    const dispatch = useDispatch();
  
    let history = useHistory();
  
    const handleOnClick = (event) => {
      event.preventDefault();
      var email = document.getElementById("user_email_id").value
      var password = document.getElementById("user_password_id").value
      setHidden(false);
  
      APICalls.login({email: email, password: password}).then(response => {
          if(response.data.result) {
            dispatch(userActions.loadCurrentUser(response.data.data.email, response.data.id))
            dispatch(userActions.setAuthenticated(response.data.result))
            dispatch(userActions.setAuthToken(response.data.data.token))
            setError(false);
            setErrorText("");
            history.push("/home");
          }
          
      }).catch(error => {
          console.log(error);
          setError(true);
          setHidden(true);
          setErrorText("Password and username do not match");
      })
    }
  
    const handleChange = (event) => {
      setValues({...values, password: event.target.values})
      setError(false);
      setErrorText("");
    }
  
    const handleClickShowPassword = () => {
      setValues({...values, showPassword: !values.showPassword})
    };

    const handleClick = () => {
      setOpen(true);
    }
    

    return(<div className={classes.root}>
        <Typography variant="h3" className={classes.root}>
            Get Started 
        </Typography>
        <form onSubmit={e => handleOnClick(e)}>
            <div>
          <TextField 
          required
          label="Email"
          type="text"
          color="primary"
          id="user_email_id"
          variant="outlined"
          error={error}
          helperText={errorText}
          className={classes.topMargin}
          onChange={handleChange}
          />
          </div>
          <div>
          <TextField 
          required
          variant="outlined"
          label="Password"
          type={values.showPassword ? 'text' : 'password'}
          color="primary"
          id="user_password_id"
          error={error}
          helperText={errorText}
          onChange={handleChange}
          className={classes.topMargin}
          InputProps={{
            endAdornment: <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>    
        }}
          />
          </div>
          <div>
        <Button 
        variant="outlined" 
        className={classes.topMargin} 
        style={{background: 'linear-gradient(45deg, #644e5b 30%, #314455 90%)', color: 'white'}} 
        color="secondary" 
        type="submit">
            <Typography 
            variant="h6">
              LogIn
            </Typography>
        </Button>
        </div>
          </form>
          <div>
          <Typography variant="h5" className={classes.register}>
              or<span> </span>
              <Link onClick={handleClick} style={{color: 'blue'}}>
              <u>Register</u>
            </Link>
          </Typography>
        <LinearProgress hidden={hide} variant="query" className={classes.root}/>
        </div>
        <div>
          <RegisterModal open={open} onClose={handleClose}/>
        </div>
    </div>);
}