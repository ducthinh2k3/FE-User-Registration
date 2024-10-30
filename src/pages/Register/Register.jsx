import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FacebookIcon, GoogleIcon} from '../../../components/CustomIcon/CustomIcon';
import ValidationLogin from '../../../components/ValidateForm/ValidateLogin';
import FormContainer from '../../../components/Form/FormContainer';
import Card from '../../../components/Form/Card';
import ValidationRegister from '../../../components/ValidateForm/ValidateRegister';

export const Register = () => {
    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        console.log("Form Submitted");
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rePassword = document.getElementById('repassword').value;
        const errorInput = ValidationRegister({email, password, rePassword});
        setError(errorInput)
        console.log(errorInput)

        if(Object.keys(errorInput).length === 0){
            console.log({
                email,
                password
            });
        }
    }

    return (
        <>
        <FormContainer direction="column" justifyContent="space-between">
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
                            href="/material-ui/getting-started/templates/sign-in/"
                            variant="body2"
                            sx={{ alignSelf: 'center' }}
                            >
                            Sign in
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
        </FormContainer>
        </>
    )
}
