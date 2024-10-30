import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FacebookIcon, GoogleIcon} from '../../../components/CustomIcon/CustomIcon';
import ValidationLogin from '../../../components/ValidateForm/ValidateLogin';
import FormContainer from '../../../components/Form/FormContainer';
import Card from '../../../components/Form/Card';
import { postDataToAPI } from '../../ultis/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../components/spinner/Spinner';

export const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')
    const notify = (text) => toast(text);
    const navigate = useNavigate()

    const handleSignUpClick = (event) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
        window.location.href = '/register';// Điều hướng đến /register
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
                const res =await postDataToAPI('/user/login', {
                    email,
                    password
                })
                setIsLoading(false)
                console.log(res);
                if(res.status === 202){
                    localStorage.setItem('isAuthenticated', 'true');
                    notify("Login successful")
                    navigate('/');
                    // setTimeout(() => {
                    //     navigate('/login');
                    // }, 1000);
                }
            } catch (error) {
                setIsLoading(false)
                console.log(error.response)
                notify(error.response.data.details[0])
            }
        }
    }

    return (
        <>
        <FormContainer direction="column" justifyContent="space-between">
            {isLoading ? <Spinner/> : 
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
                        <FormLabel sx={{textAlign: "left", color: 'white'}} >Email</FormLabel>
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
                            <FormLabel htmlFor="password" sx={{color: 'white'}}>Password</FormLabel>
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
                            // color={passwordError ? 'error' : 'primary'}
                        />
                    </FormControl>

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        // onClick={validateInputs}
                    >
                        Sign in
                    </Button>
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
            }
        </FormContainer>
        <ToastContainer />
        </>
    )
}
