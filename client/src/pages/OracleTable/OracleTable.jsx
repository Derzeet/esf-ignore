import * as React from "react";
import axios from 'axios';

import ExitToAppIcon from '@mui/icons-material/ExitToApp'

import exportFromJSON from "export-from-json";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import './oracleTable.scss'
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {DateField} from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from "dayjs";
import moment from "moment/moment";
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import {saveAs} from "file-saver"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import admins from "../../listOfAdmins/admins"
function userAdmin() {
    const login = Cookies.get('login');
    if (admins.includes(login)) {
        return true
    } else {
        return false
    }
}

const baseURL = "http://192.168.30.24:9265/"
const fields = {
  "DESCRIPTION": "Описание товара",
  "UNIT_CODE": "Код товара",
  "UNIT_NOMENCLATURE": "Единица измерения",
  "IIN_SELLER": "Продавец",
  "IIN_CUSTOMER": "Покупатель",
  "STATUS_CUSTOMER": "Статус покупателя",
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

function OracleTable(props) {
    const theme = useTheme();
    const navigate = useNavigate()
    const [groupField, setGroupFields] = React.useState([])
    const login = React.useState(Cookies.get('login') ? Cookies.get('login') : "")
    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setGroupFields(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };


    const [loading, setLoading] = React.useState(false)
    const labelStyle = {
        fontSize: '14px', /* set the desired font size */
    };
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [count, setCount] = React.useState(0)
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 15) : 0;
  
    const handleChangePage = (event, newPage) => {
        console.log(newPage)
        // getData()
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const [filter, setFilter] = React.useState('')
    const [search, setSearch] = React.useState('')
    const [startDate, setStartDate] = React.useState(dayjs('2019-01-01'))
    const [endDate, setEndDate] = React.useState(dayjs('2023-01-01'))
    const [mainList, setMainList] = React.useState([])
    const [last_filter, setLastFilter] = React.useState('')
    const [last_search, setLastSearch] = React.useState('')
    const [last_startDate, setLastStartDate] = React.useState(dayjs('2019-01-01'))
    const [last_endDate, setLastEndDate] = React.useState(dayjs('2023-01-01'))
    const [last_groupField, setLastGroupField] = React.useState([])

    const [displayColumns, setDisplayColumns] = React.useState([])
    const [openDialog, setOpenDialog] = React.useState(false);

    const [testReason, setTestReason] = React.useState('')
    const [dopInfo, setDopInfo] = React.useState('')
    const handleClickOpen = () => {
        if (userAdmin()) {
            getData()
        } else {
            setTestReason('')
            setDopInfo('')
            setOpenDialog(true);

        }
    };

    const handleClose = () => {
        setOpenDialog(false);
    };
    const handleSave = async () => {
        handleClose();
    };

    const getData = async () => {
        const params = {
            filter,
            search,
            startDate: startDate ? startDate.format('YYYY-MM-DD') : null,
            endDate: endDate ? endDate.format('YYYY-MM-DD') : null,
            groupField: groupField.join(','),
            testReason,
            dopInfo
        }
        setLoading(true)
        handleClose();
        setDisplayColumns(groupField)
        const token = Cookies.get('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log(params)
        axios.get(baseURL + 'esf', {params: params}).then((res) => {
            console.log(res.data)
            setMainList(res.data)
            setLoading(false)
            setLastFilter(filter)
            setLastEndDate(endDate ? endDate.format('YYYY-MM-DD') : null)
            setLastStartDate(startDate ? startDate.format('YYYY-MM-DD') : null)
            setLastSearch(search)
            setLastGroupField(groupField)
        })
    }



    const download = () => {
        const params = {
            filter: last_filter,
            search: last_search,
            startDate: last_startDate,
            endDate: last_endDate,
            groupField: last_groupField.join(',')
        }
        axios
            .get(baseURL + 'download', {params: params, responseType: 'blob'})
            .then(response => {
                const file = new Blob([response.data]);
                saveAs(file, 'data.xlsx');
            })
            .catch(error => {
                console.error('Error downloading file:', error);
            });
    }
    const [isFormValid, setFormValid] = React.useState(false);
    const checkFormValidity = () => {
        // Perform validation logic here
        if (testReason != "" && dopInfo != "") {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    };
    const deleteCookie = () => {
        Cookies.remove('token')
        Cookies.remove('login')
        navigate('/login')
    }
    return (
        <div className="wholeBlock">
            <Dialog open={openDialog} onClose={handleClose} PaperProps={{ style: { width: 800, top: -10}}}>
                <div style={{padding: '10px', backgroundColor: '#0D0F11', borderRadius: '2px', border: '0.1px solid rgba(134, 134, 134, 0.31)'}}>
                    <DialogTitle><a style={{fontWeight: 700, fontSize: '25px'}}>Основания проверки</a></DialogTitle>
                    <DialogContent>
                        <div style={{ marginTop: '40px'}}>
                            <FormControl fullWidth style={{width: '100%'}}>
                                <InputLabel id="demo-simple-select-label">Основания проверки</InputLabel>
                                <Select
                                    // size="small"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={testReason}
                                    label="Основания проверки"

                                    onChange={(e) => {
                                        setTestReason(e.target.value)
                                        checkFormValidity();
                                    }}
                                >
                                    <MenuItem value={'Тематика аналитической работы'}>Тематика аналитической работы</MenuItem>
                                    <MenuItem value={'Уголоное дела/ЕРДР'}>Уголоное дела/ЕРДР</MenuItem>
                                    <MenuItem value={'Следственные поручения'}>Следственные поручения</MenuItem>
                                    <MenuItem value={'Поручения прокурора'}>Поручения прокурора</MenuItem>
                                    <MenuItem value={'Международные поручения'}>Международные поручения</MenuItem>
                                    <MenuItem value={'Поручения АФМ РК'}>Поручения АФМ РК</MenuItem>
                                    <MenuItem value={'Поручения вышестоящего руководства'}>Поручения вышестоящего руководства</MenuItem>
                                    <MenuItem value={'Материалы оперативных проверок'}>Материалы оперативных проверок</MenuItem>
                                </Select>

                                <TextField
                                    value={dopInfo}
                                    onChange={(e) => {
                                        setDopInfo(e.target.value)
                                        checkFormValidity();
                                    }}
                                    style={{marginTop: '30px'}}
                                    id="outlined-basic"
                                    label="Номер ЕРДР/Дата/ФИО руководств/Сфера/Тематика"
                                    variant="outlined" />
                            </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Отмена</Button>
                        <Button onClick={() => {getData()}} disabled={!isFormValid}>Запрос</Button>
                    </DialogActions>
                </div>
            </Dialog>
            <div className="searchBar" style={{position: 'relative'}}>
                <FormControl sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">Фильтр</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-label"
                                label = "Фильтр"                                
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                MenuProps={MenuProps}
                                >
                                    <MenuItem value={'seller'}>Продавец</MenuItem>
                                    <MenuItem value={'custumer'}>Покупатель</MenuItem>
                                    <MenuItem value={'good'}>Описание товара</MenuItem>
                            </Select>
                            <FormControl>
                                {/* <InputLabel id="outlined-basic">Поиск</InputLabel> */}
                                <TextField 
                                    id="outlined-basic" 
                                    label="Поиск" 
                                    // size= "small" 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    sx={{width: '100%', p: 0}} 
                                    style={{ margin: '0 auto', marginTop: '15px'}} 
                                    variant="outlined" 
                                    helperText="Разделение через запятую"/>

                            </FormControl>
                            <div style={{marginTop: '15px'}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker 
                                        sx={{width: '100%', p: 0, marginBottom: '15px'}}
                                        label="Период с"
                                        value={startDate} 
                                        format="YYYY/MM/DD"
                                        onChange= {e=> setStartDate(e)} 
                                        size= "small" />
                                    <DatePicker required label="Пeриод по"
                                        value={endDate} 
                                        format="YYYY/MM/DD"
                                        onChange={e=> setEndDate(e)} 
                                        sx={{width: '100%', p: 0}} style={{ margin: '0 auto', marginBottom: '30px'}} />
                                </LocalizationProvider>
                            </div>
                </FormControl>
                <FormControl sx={{ m: 1, width: '90%'}}>
                        <InputLabel id="demo-multiple-chip-label">Поля для группировки</InputLabel>
                        <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={groupField}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Поля для группировки" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={fields[value]} label={fields[value]} sx={{borderRadius: '4px', backgroundColor: '#4dabf5'}}/>
                            ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                        >
                        {Object.keys(fields).map((key) => (
                            <MenuItem
                            key={key}
                            value={key}
                            style={getStyles(key, groupField, theme)}
                            >
                            {fields[key]}
                            </MenuItem>
                        ))}
                        </Select>
                </FormControl>

                    <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'flex-end', width: '90%'}}>
                        <Button
                            sx={{
                                height: '34px',
                                backgroundColor: "#33B6FF",
                                color: 'white',
                                width: '100px',
                            }}
                            variant="contained"
                            onClick={() => {
                                handleClickOpen()
                            }}
                            >
                                <span style={{ fontWeight: '600' }} className='buttonSearch'>Запрос</span>
                        </Button>
                    </div>
                <div style={{position: 'absolute', bottom: '10px', right: '10px'}}>
                    <a style={{color: "grey", marginRight: "20px", fontSize: '14px'} }>{login}</a>
                    {userAdmin() ?
                        <Button variant="outlined" sx ={{marginRight: '10px'}} onClick={() => navigate("/logs")}>
                            Логи
                        </Button>
                        :
                        <></>
                    }

                    <Button variant="outlined" onClick={() => deleteCookie()} endIcon={<ExitToAppIcon/>}>
                        Выйти
                    </Button>
                </div>
            </div>
            <div className="tableBlock" style={{}}>
                <div className="tableSam" style={{ height: '90% !important'}}> 
                        <ResultTable list={mainList} columns={displayColumns}/>
                    {loading && (
                        <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                        </Box>
                    )}
                    {!loading && (
                        ""
                    )}
                </div>
                {!loading && (
                    <>
                    {/* <div style={{display: 'flex', justifyContent: 'flex-start', float: 'right', marginRight: '5%'}}>
                        <TableFooter >
                            <TableRow >
                                <TablePagination style={{borderBottom: 'hidden'}}
                                    colSpan={3}
                                    count={count}
                                    rowsPerPage={10}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    ActionsComponent={TablePaginationActions}
                                    rowsPerPageOptions={10}
                                    />
                            </TableRow>
                        </TableFooter>
                        </div> */}
                    <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'flex-end', width: '95%'}}>
                        {/*<IconButton onClick={download} aria-label="download" size="large">*/}
                        {/*    <FileDownloadIcon fontSize="inherit" />*/}
                        {/*</IconButton>*/}
                        <Button variant="outlined" onClick={download} aria-label="download" size="large"endIcon={<FileDownloadIcon/>}>
                            Скачать результат
                        </Button>
                    </div>
                    </>
                )}
            </div>
        </div>
    )
}


function ResultTable(props) {
    const {list, columns} = props
    const downloadSchema = (row) => {

        axios.get('http://192.168.30.24:1415/export-to-pdf/' + row.messOfmId + '/' + row.memberId, {responseType: 'blob'}).then(res=> {
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'document.pdf')
            document.body.appendChild(link)
            link.click()
        }) 
    }

    const Dcolumns = {
      "DESCRIPTION": "Описание товара",
      "UNIT_CODE": "Код товара",
      "UNIT_NOMENCLATURE": "Единица измерения",
      "IIN_SELLER": "Продавец",
      "IIN_CUSTOMER": "Покупатель",
      "STATUS_CUSTOMER": "Статус покупателя",
      "Total": "Всего",    
      "QUANTITY": "Количество"    
    }
  
    return ( <>
        <TableContainer component={Paper} sx={{maxHeight: 600}} >
            <Table sx={{ minWidth: 650, overflow: 'auto' }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                <TableCell  sx={{ position: 'sticky', left: 0, zIndex: 1}}></TableCell>
                {columns.map((column) => (
                    <TableCell sx={{ whiteSpace: 'nowrap' }}  key={column}>{Dcolumns[column]}</TableCell>
                    ))}
                    <TableCell sx={{ whiteSpace: 'nowrap' }} >Всего</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }} >Количество</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {list.map((row, index) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    {/* <TableCell  sx={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: '#0D0F11'}}><p style={{cursor: 'pointer'}} onClick={() => downloadSchema(row)}>Скачать</p></TableCell> */}
                    <TableCell  component="th" sx={{ position: 'sticky', left: 0, zIndex: 1}} scope="row">{index+1}</TableCell>
                      {Object.keys(row).map((key) => ( 
                        <TableCell  component="th" scope="row">{row[key]}</TableCell>
                      ))
                      }
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}
// interface TablePaginationActionsProps {
//     count: number;
//     page: number;
//     rowsPerPage: number;
//     onPageChange: (
//       event: React.MouseEvent<HTMLButtonElement>,
//       newPage: number,
//     ) => void;
//   }
  
  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        {/* <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton> */}
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        {/* <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton> */}
      </Box>
    );
  }
export default OracleTable
