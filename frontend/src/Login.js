import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link as Nv } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, NavLink } from "react-router-dom";
import {useState} from 'react';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
 
const Login=()=>{
 
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#3370bd'}
    const btnstyle={margin:'8px 0'}
     
    const [msg,setMsg] = useState('');
 
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
 
    const [user, setUser] = useState({
        email: "",
        password:""
      });
 
      let history = useHistory(); 
 
      const {email,password} = user;
      const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
 
    const signIn = () =>
    {
 
      const users = { username };  // To Store Email in Localstore and send to Home Page 
 
       if(user.email === '')
       {
         alert('Email Field is empty')
       }
       else if(user.password === '')
       {
         alert('Pass Field is empty')
       }
 
       axios.post("http://localhost:8000/api/reactlogin/",user)
       .then(response => {
        setMsg(response.data);
        localStorage.setItem("users",response.data);
        history.push("/Home");
      });
    }
 
    
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                  <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                    <h4 style={{color:"green"}}>{msg}</h4>
                </Grid>
                <TextField label='Email'  name="email" value={email}  onChange={e => onInputChange(e)} placeholder='Enter Email' type='text' fullWidth required/>
                <TextField label='Password'  name="password" value={password}  onChange={e => onInputChange(e)} placeholder='Enter password' type='text' fullWidth required/>
              
                <Button type='submit' onClick={signIn} color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
              
                <Typography > Don't Have Account ?
                  <NavLink to="Signup">
                   <span style={{marginLeft:"4px"}}>Singup</span>
                  </NavLink>
                </Typography>
            </Paper>
        </Grid>
    )
}
 
export default Login
