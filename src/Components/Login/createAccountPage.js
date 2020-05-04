import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import APICalls from '../Axios/ApiCall'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    root: {
      textAlign: "left",
      marginTop: theme.spacing(3),
    },
    topMargin: {
        marginTop: theme.spacing(2),
        width: 450
    }
}));

export default function CreateAccountPage() {

    const classes = useStyles();

    const [error, setError] = React.useState(false);

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false
    });

    const [emailErrorText, setEmailErrorText] = React.useState("");
    const [errorText, setErrorText] = React.useState("");

    const handleOnClick = (event) => {
        event.preventDefault()
        var email = document.getElementById("new_user_email_id").value
        var password = document.getElementById("new_user_password_id").value
        var confirmPassword = document.getElementById("confirm_user_password_id").value
        if(password !== confirmPassword) {
            setErrorText("Passwords do not match")
            setError(true);
        }
        else {
            //console.log(email + password + confirmPassword)
            APICalls.signup({email: email, password: password}).then(response => {
                console.log(response.data)
                setError(false);
                setErrorText("");
            }).catch(error => {
                console.log(error)
            })
        }
    }

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword})
      };

    const handleOnChange = (event) => {
        setValues({...values, password: event.target.values})
        setError(false);
        setErrorText("");
    }

    return (<div>
        <Typography variant="h3" className={classes.root}>
            W3lc0m3 t0 gu3r1lla surv3ys
        </Typography>
        <form className={classes.root} onSubmit={e => handleOnClick(e)}>
        {/* <div className={classes.root}> */}
            <div><TextField id="new_user_email_id"
            required variant="outlined" className={classes.topMargin} label="Email" type="email"
            helperText={emailErrorText}
            /></div>
            <div><TextField id="new_user_password_id"
            required variant="outlined" className={classes.topMargin} label="Password" 
            type={values.showPassword ? 'text' : 'password'}
            helperText={errorText}
            error={error}
            onChange={handleOnChange}
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
            required variant="outlined" className={classes.topMargin} label="Confirm Password" type="password"
            helperText={errorText}
            error={error}
            onChange={handleOnChange}
            /></div>
            <Button type="submit"
            variant="contained" color="primary" style={{background: 'linear-gradient(45deg, #644e5b 30%, #314455 90%)'}} className={classes.topMargin} >
                <Typography variant="h5">
                    Sign Up
                </Typography>
            </Button>
        </form>
        {/* </div> */}
    </div>);
}