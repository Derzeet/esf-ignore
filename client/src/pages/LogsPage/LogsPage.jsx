import React, { useState, useEffect } from "react";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import admins from "../../listOfAdmins/admins"
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userLogin', headerName: 'Логин', width: 130 },
    { field: 'requestParams', headerName: 'Запрос', width: 600 },
    { field: 'approvalBody', headerName: 'Основания проверки', width: 600 },
];

const baseURL = "http://192.168.30.24:9265/";
function userAdmin() {
    const login = Cookies.get('login');
    if (admins.includes(login)) {
        return true
    } else {
        return false
    }
}
const Logs = () => {
    const navigate = useNavigate();


    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = React.useState()
    const [endDate, setEndDate] = React.useState()
    const [login, setLogin] = React.useState('')
    useEffect(() => {
        if (!userAdmin()) {
            // Cookies do not exist, redirect to the login page
            navigate('/');
        } else if (Cookies.get('login') == null) {
            navigate('/login');
        } else {
            fetchLogs();
        }

    }, [login, endDate, startDate]);

    const fetchLogs = async () => {
        setLoading(true);

        try {
            const response = await axios.get(baseURL + 'logs', {
                params: {
                    startDate: startDate ? startDate.format('YYYY-MM-DD') : null,
                    endDate: endDate ? endDate.format('YYYY-MM-DD') : null,
                    userLogin: login !== "" ? login : null,                },
            });
            console.log(response.data)
            const logsWithId = response.data.logs.map((log, index) => ({ id: index + 1, ...log }));
            setLogs(logsWithId);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <>
            <div style={{ width: '80%', margin: '0 auto', marginTop: '100px'}}>
            <Button variant="outlined" onClick={() => navigate("/")} startIcon={<ArrowBackIcon />}>
                Назад
            </Button>
            </div>
            <div style={{ width: '80%', margin: '0 auto', marginTop: '10px'}}>
                <h1>Логи</h1>
            </div>
            <div style={{ width: '80%', margin: '0 auto', marginTop: '30px', display: 'flex', justifyContent: 'space-between'}}>
                <TextField value={login} onChange={(e) => {setLogin(e.target.value)}} sx={{width: '30%'}} id="outlined-basic" label="Логин" variant="outlined" />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{width: '30%'}}
                        label="Период с"
                        value={startDate}
                        format="YYYY/MM/DD"
                        onChange= {e=> setStartDate(e)}
                        size= "small"
                    />
                    <DatePicker
                        required
                        label="Пeриод по"
                        value={endDate}
                        format="YYYY/MM/DD"
                        onChange={e=> setEndDate(e)}
                        sx={{width: '30%'}}
                        style={{ margin: '0 auto', marginBottom: '30px'}}
                    />
                </LocalizationProvider>
            </div>
            <div style={{ width: '80%', margin: '0 auto', marginTop: '10px'}}>
                <DataGrid
                    rows={logs}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 5}
                        }
                    }}
                    pageSizeOptions={[5, 10]}
                    // loading={loading}
                />
            </div>
        </>
    );
};

export default Logs;

