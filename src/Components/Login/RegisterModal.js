import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';

import { useHistory } from "react-router-dom";
//redux
import { useDispatch } from "react-redux";
import APICalls from '../Axios/ApiCall'
import * as userActions from '../../store/actions/userActions'


const useStyles = makeStyles(theme => ({
    root: {
        textAlign: "left",
        marginTop: theme.spacing(3),
    },
    topMargin: {
        marginTop: theme.spacing(2),
        width: 300
    }
}));


export default function RegisterPage(props) {
    const classes = useStyles();

    const dispatch = useDispatch();

    let history = useHistory();

    const [hide, setHidden] = React.useState(true);

    const { open, onClose } = props;

    const handleClose = (event) => {
        setHidden(true);
        setError(false);
        setErrorText("");
        setEmailErrorText("")
        onClose();
    };

    const [error, setError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);

    const [values, setValues] = React.useState({
        password: '',
        confirmPassword: '',
        email: '',
        showPassword: false
    });

    const [emailErrorText, setEmailErrorText] = React.useState("");
    const [errorText, setErrorText] = React.useState("");

    const handleOnClick = (event) => {
        event.preventDefault()
        var email = document.getElementById("new_user_email_id").value
        var password = document.getElementById("new_user_password_id").value
        var confirmPassword = document.getElementById("confirm_user_password_id").value
        setHidden(false);
        if (password !== confirmPassword) {
            setErrorText("Passwords do not match")
            setError(true);
            setHidden(true);
        }
        else {
            console.log(email)
            APICalls.signup({ email: email, password: password }).then(response => {
                console.log(response.data)
                if(response.data.result) {
                    APICalls.login({email: email, password: password}).then(response => {
                        if(response.data.result) {
                          dispatch(userActions.loadCurrentUser(response.data.data.email, response.data.id))
                          dispatch(userActions.setAuthenticated(response.data.result))
                          dispatch(userActions.setAuthToken(response.data.data.token))
                          setError(false);
                          setEmailError(false);
                          setErrorText("");
                          history.push("/home");
                        }
                        
                    }).catch(error => {
                        console.log(error);
                        setError(true);
                        setEmailError(true);
                        setHidden(true);
                        setErrorText("Email already exists");
                    })
                }
            }).catch(error => {
                console.log(error)
                setHidden(true);
                setEmailErrorText("Email already exists")
                setEmailError(true);
            })
        }
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    };

    const handleOnPasswordChange = (event, prop) => {
        setValues({ ...values, [prop]: event.target.values })
        setError(false);
        setEmailError(false);
        setEmailErrorText("")
        setErrorText("");
    }

    return (<div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" style={{ background: 'linear-gradient(45deg, #644e5b 30%, #314455 90%)', color: 'white' }}>{"Create A New Account"}</DialogTitle>
            <form onSubmit={e => handleOnClick(e)}>
                <DialogContent>
                    <div><TextField id="new_user_email_id"
                        required variant="outlined" 
                        className={classes.topMargin} 
                        label="Email" 
                        type="email"
                        onChange={(e) => handleOnPasswordChange(e, 'email')}
                        error={emailError}
                        helperText={emailErrorText}
                    /></div>
                    <div><TextField id="new_user_password_id"
                        required variant="outlined" className={classes.topMargin} label="Password"
                        type={values.showPassword ? 'text' : 'password'}
                        helperText={errorText}
                        error={error}
                        onChange={(e) => handleOnPasswordChange(e, 'password')}
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
                    <div><TextField id="confirm_user_password_id"
                        required variant="outlined"
                        className={classes.topMargin}
                        label="Confirm Password"
                        type={values.showPassword ? 'text' : 'password'}
                        helperText={errorText}
                        error={error}
                        onChange={(e) => handleOnPasswordChange(e, 'confirmPassword')}
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
                    /></div>
                    <LinearProgress hidden={hide} variant="query" className={classes.root}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" >
                        Cancel
          </Button>
                    <Button color="primary" style={{ color: 'green' }} autoFocus type="submit">
                        Register
          </Button>
          
                </DialogActions>
            </form>
            
        </Dialog>

    </div>);
}