import React,{ useState} from 'react'
import {Segment} from 'semantic-ui-react'
import TextField from '@material-ui/core/TextField';
import '../App.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import {login} from '../redux/reducer/actions'

const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      padding: '10px'
    },
  }));

function Login(props) {

    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [nError,setNError] = useState(false)
    const [pError,setPError] = useState(false)
    const [pErr,setPErr] = useState(false)


  const classes = useStyles();

  const handleChange =(e,name)=>{
    if(name==='name'){
        setName(e.target.value)
        if(/^[A-Za-z]+$/.test(e.target.value)){
            setNError(false)
        }
        else if(e.target.value == ''){
            setNError(false)
        }
        else{
            setNError(true)
        }
    }
    else if(name === 'password'){
        setPassword(e.target.value)
        // console.log(e.target.value.length)
        if(/^[a-z0-9]+$/i.test(e.target.value || e.target.value == '')){
            setPError(false)

            if(e.target.value.length === 8 || e.target.value == ''){
                setPErr(false)
            }
            else{
                setPErr(true)
            }

        }
        else{
            setPError(true)
        }
    }

  }

  const submit = (e) => {
      e.preventDefault();
        if(name === '' && password === ''){
            alert("Username and Password is required")
        }
        else if(nError == false && pError == false && pErr == false){
            // alert("login")
            props.login(name,password)
        }
        else {
            alert("Enter valid details")
        }
  }

  return (
      <div className="bg-clr">
        <Segment raised className="mx-auto margin-card">
            <h2 className="login-text text-center">
            <span className="login-clr">Login</span>
            </h2>
            <div className="row">
                <div className="col">
                <form className={classes.form} >
        
                    <TextField 
                    id="filled-password-input"
                    label="Username"
                    variant="filled"
                    margin="normal" 
                    fullWidth
                    value={name}
                    onChange={(e)=>handleChange(e,'name')}
                    error={nError}
                    helperText={nError? <span style={{color: 'red'}}>Username should not contain numbers,special characters and space</span>: ''}
                    />
                   <TextField
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    variant="filled"
                    margin="normal" 
                    fullWidth
                    value={password}
                    onChange={(e)=>handleChange(e,'password')}
                    error={pError || pErr}
                    helperText={pError? <span style={{color: 'red'}}>Password should not contain spaces and special characters</span> : pErr ? <span style={{color: 'red'}}>Password should contain 8 characters</span>: ''}
                    /> 
                    <div className="row mt-3">
                        <div className="col text-center">
                        <Button variant="contained" className="w-100 button-clr" type="submit" onClick={(e)=>submit(e)}>LOGIN</Button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
            
        </Segment>
      </div>
          
  );
}

const mapDispatchToProps=dispatch=>{
    return{
        login: (name,password)=>dispatch(login(name,password))
    }
}

export default connect('',mapDispatchToProps)(Login);
