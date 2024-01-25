import React, {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import axios from 'axios'
import default_host from "../../config/config"
import Snackbar from '@mui/material/Snackbar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const navigate = useNavigate()

    useEffect(() => {
        if (Cookies.get("token")) {
            navigate("/")
        }
    })
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async() => {
        const loginRequest = {
            login: login,
            password: password
        };

        try {
            const response = await axios.post(default_host + "api/login", loginRequest);
            Cookies.set('token', response.data.token);
            Cookies.set('login', response.data.login);
            // console.log(response.data.status); // Handle the response as neede
            navigate('/')
        } catch (error) {
            console.error(error); // Handle the error
            setOpen(true)
        }
    };

    return (
        <>
        <Snackbar
            open={open}
            onClose={handleClose}
            TransitionComponent={transition}
            message="Ошибка при входе"
            key={transition ? transition.name : ''}
        />
        <div style={{ width: '500px', margin: '0 auto', position: 'relative',
            top: '40%',
            transform: 'translateY(-50%)'}}>
            <FormControl>
                <TextField
                    sx={{width: '500px', p: 0}}
                    style={{ margin: '0 auto', marginTop: '15px'}}
                    label="Логин"
                    value={login}
                    onChange={(event) => setLogin(event.target.value)}
                />
                <TextField
                    sx={{width: '500px', p: 0}}
                    style={{ margin: '0 auto', marginTop: '15px'}}
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button
                    onClick={handleSubmit}
                    sx={{width: '500px', p: 0, height: '40px'}}
                    style={{ margin: '0 auto', marginTop: '15px'}} variant="outlined" type="submit">
                    Войти
                </Button>
            </FormControl>
        </div>
        </>
    );
};

export default Login;
