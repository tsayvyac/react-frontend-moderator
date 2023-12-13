import * as React from 'react';
import {useContext, useEffect, useRef, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link} from "react-router-dom";
import {initializeApp} from "firebase/app";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import AuthContext from "../apis/context/AuthProvider";
import Cookies from 'js-cookie';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Better City
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export default function Login() {

    const { setAuth } = useContext(AuthContext)
    const [error, setError] = useState("NONE-ERROR")
    const [success, setIsSuccess] = useState(false)
    const emailRef = useRef("")




    const validateFields = (email, password) => {
        setIsSuccess(false)
        if(!email || !password) setError('Fill all fields')
        else if(!validateEmail(email)) setError('Email format is invalid')
        else {setError('NONE-ERROR')
            return true}
        return false
    }

    const firebaseConfig = {
        apiKey: "AIzaSyClK4fF0-fOrs_Acg8QMRT1YMw0r2sXSwk",
        authDomain: "ctu-nss.firebaseapp.com",
        databaseURL: "https://ctu-nss-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "ctu-nss",
        storageBucket: "ctu-nss.appspot.com",
        messagingSenderId: "441926160180",
        appId: "1:441926160180:web:0351f11bf618f2d0bddf61"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);


    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
        let email= data.get('email')
        let password = data.get('password')

        if(validateFields(email, password)){
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const token = user.accessToken
                    const expTime = user.stsTokenManager.expirationTime
                    setAuth({email, token, expTime})
                    setIsSuccess(true)
                    // window.location = '/main';
                    console.log(user)
                })
                .catch((error) => {
                    setError(`${error.code} ${error.message}`)
                });
        }
    };

    useEffect(() => {
    }, [error, success]);

  
    return (
        <Container maxWidth={false}
        sx={{
            position:'absolute',
            zIndex:"99999999",
            width:"100wh",
            height:"100vh",
            backgroundColor:'white',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'column'
        }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
           }}
          >
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box sx={{
                      marginTop: 1,
                      display: error === 'NONE-ERROR' ? 'none' : 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent:'center',
                      backgroundColor:'#EE4B2B',
                      width:"100%",
                      height:"25px",
                        borderRadius:"5px",
              }}>
                  <Typography sx={{fontSize:"13px", color:"white"}}>{error}</Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
            </Box>
          </Box>
            <Copyright sx={{ mt: 8, mb: 4 }}/>
        </Container>

    );
  }
