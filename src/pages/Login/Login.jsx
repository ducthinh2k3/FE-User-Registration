import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FacebookIcon, GoogleIcon} from '../../../components/CustomIcon/CustomIcon';
import ValidationLogin from '../../../components/ValidateForm/ValidateLogin';
import FormContainer from '../../../components/Form/FormContainer';
import Card from '../../../components/Form/Card';
import { fetchDataFromAPI, postDataToAPI } from '../../ultis/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../components/spinner/Spinner';
import { useDispatch } from 'react-redux';
import { saveUserLogin } from '../../redux/action';

export const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')
    const notify = (text) => toast(text);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const handleSignUpClick = (event) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
        navigate('/register');// Điều hướng đến /register
      };

    const handleSubmit = async (event) => {
        setIsLoading(true);
        console.log("Form Submitted");
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(email + password);
        const errorInput = ValidationLogin({email, password});
        setError(errorInput)
        console.log(errorInput)

        if(Object.keys(errorInput).length === 0){
            try {
                const res =await postDataToAPI('/login', {
                    email,
                    password
                })
                setIsLoading(false)
                console.log(res);
                if(res.status === 202){
                    localStorage.setItem("jwt", res.token);
                    const userInfo = await fetchDataFromAPI("/profile", res.token);
                    console.log(userInfo);
                    dispatch(saveUserLogin({
                        email: userInfo.data.email,
                        token: res.token
                    }))
                    notify("Login successful")
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                }
            } catch (error) {
                setIsLoading(false)
                console.log(error.response)
                notify(error.response.data.details[0])
            }
        } else {
            setIsLoading(false)
        }
    }

    return (
        <>
        <FormContainer direction="column" justifyContent="space-between">
            
            <Card variant="outlined">
                {/* <SitemarkIcon /> */}
                <Typography
                    component="h4"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', fontWeight: 'bold' }}
                >
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit= {handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel sx={{textAlign: "left", color: 'black'}} >Email</FormLabel>
                        <TextField
                            error={!!error.email}
                            helperText={error.email}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            // autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            // color={emailError ? 'error' : 'primary'}
                            sx={{ ariaLabel: 'email' }}
                        />
                    </FormControl>

                    <FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormLabel htmlFor="password" sx={{color: 'black'}}>Password</FormLabel>
                            <Link
                                component="button"
                                type="button"
                                // onClick={handleClickOpen}
                                variant="body2"
                                sx={{ alignSelf: 'baseline' }}
                            >
                                Forgot your password?
                            </Link>
                        </Box>
                        <TextField
                            error={!!error.password}
                            helperText={error.password}
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            required
                            fullWidth
                            variant="outlined"
                            
                        />
                    </FormControl>

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    {isLoading ? <Spinner/> : 
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        // onClick={validateInputs}
                    >
                        Sign in
                    </Button>
                        }
                    <Typography sx={{ textAlign: 'center' }}>
                        Don&apos;t have an account?{' '}
                        <span>
                        <Link
                            href="/material-ui/getting-started/templates/sign-in/"
                            variant="body2"
                            onClick={handleSignUpClick}
                            sx={{ alignSelf: 'center' }}
                            >
                            Sign up
                        </Link>
                        </span>
                    </Typography>
                </Box>
                <Divider>or</Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                    fullWidth
                    variant="outlined"
                    // onClick={() => alert('Sign in with Google')}
                    startIcon={<GoogleIcon />}
                    >
                    Sign in with Google
                    </Button>
                    <Button
                    fullWidth
                    variant="outlined"
                    // onClick={() => alert('Sign in with Facebook')}
                    startIcon={<FacebookIcon />}
                    >
                    Sign in with Facebook
                    </Button>
                </Box>
            </Card>
            
        </FormContainer>
        <ToastContainer />
        </>
    )
}
