import * as React from 'react';
import {useContext, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link, useNavigate} from "react-router-dom";
import {initializeApp} from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import AuthContext from "../apis/context/AuthProvider";

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

export default function Login() {

    const { setTokenAndCookie } = useContext(AuthContext)
    const nav = useNavigate()
    const [error, setError] = useState("NONE-ERROR")
    const [loading, setLoading] = useState(false)

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
    const fbAuth = getAuth(app);

    const handleSubmit = (event) => {
      event.preventDefault();
      setLoading(true);
      setError('NONE-ERROR')
      const data = new FormData(event.currentTarget);
        let email= data.get('email')
        let password = data.get('password')
        signInWithEmailAndPassword(fbAuth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const expTime = user.stsTokenManager.expirationTime
                await user.getIdToken(true).then(token => {
                    setTokenAndCookie(expTime, token)
                    nav('/main')
                })
            })
            .catch((error) => {
                setError(`${error.code} ${error.message}`)
            })
            .finally(res => {setLoading(false)});
    }

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
                        disabled={loading}
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
