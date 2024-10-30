import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FacebookIcon, GoogleIcon} from '../../../components/CustomIcon/CustomIcon';
import ValidationLogin from '../../../components/ValidateForm/ValidateLogin';
import FormContainer from '../../../components/Form/FormContainer';
import Card from '../../../components/Form/Card';
import ValidationRegister from '../../../components/ValidateForm/ValidateRegister';
import { fetchDataFromAPI, postDataToAPI } from '../../ultis/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../components/spinner/Spinner';
import { Link as RouterLink } from 'react-router-dom';

export const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorLoading, setErrorLoading] = useState(null);
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const notify = (text) => toast(text);

    // async function fetchData(){
    //     setIsLoading(true);
    //     // setData(null);
    //     setErrorLoading(null);
    //     try {
    //         console.log("call")
    //         const data = await fetchDataFromAPI(`/user/get-users`);
    //         console.log("response")
    //         console.log(data)
    //         setIsLoading(false)

    //     } catch (error) {
    //         setIsLoading(false)
    //         setErrorLoading(error);
    //     }
    // }

    // useEffect(() => {
    //     fetchData();
    // }, []);

    const handleSubmit = async (event) => {
        setIsLoading(true);
        console.log("Form Submitted");
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rePassword = document.getElementById('repassword').value;
        const errorInput = ValidationRegister({email, password, rePassword});
        setError(errorInput)
        console.log(errorInput)

        if(Object.keys(errorInput).length === 0){
            try {
                const res =await postDataToAPI('/user/register', {
                    email,
                    password
                })
                setIsLoading(false)
                console.log(res);
                if(res.status === 201){
                    console.log("ok")
                    notify("Create account succesfully")
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
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
                <Typography
                    component="h4"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', fontWeight: 'bold' }}
                >
                    Sign Up
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

                    <FormControl>
                        <FormLabel sx={{textAlign: "left", color: 'white'}} >Repeat Password</FormLabel>
                        <TextField
                            error={!!error.rePassword}
                            helperText={error.rePassword}
                            placeholder="••••••"
                            type="password"
                            id="repassword"
                            autoComplete="current-password"
                            required
                            fullWidth
                            variant="outlined"
                        />
                    </FormControl>

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="I want to receive updates via email."
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        // onClick={validateInputs}
                    >
                        Sign Up
                    </Button>
                    
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account?{' '}
                        <span>
                            <Link
                                component={RouterLink}
                                to="/login" // Điều hướng sử dụng react-router-dom
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                                >
                                    Sign In
                            </Link>
                        </span>
                    </Typography>
                </Box>

                <Divider>or</Divider>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    >
                    Sign up with Google
                    </Button>
                    <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FacebookIcon />}
                    >
                    Sign up with Facebook
                    </Button>
                </Box>
            </Card>
            }   
        </FormContainer>
        <ToastContainer />
        </>
    )
}
