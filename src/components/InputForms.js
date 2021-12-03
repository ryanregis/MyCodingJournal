import React from 'react'
import { Box, Typography, FormControl, FilledInput, InputLabel, Button, IconButton, Modal, Alert, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';

const styles = {
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    container: {
        m: 2,
        display: 'flex',
        width: '80%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
    },
    inputs: {
        width: '100%',
        display: 'flex',
    },
    inputTitle: {
        width: '100%',
    }

}

function InputForms(props) {


    const [inputTitle, setInputTitle] = React.useState('');
    const [inputDesc, setInputDesc] = React.useState('');

    const [dateValue, setDateValue] = React.useState(new moment());

    const handleTitle = (ev) => {
        setInputTitle(ev.target.value);
    };

    const handleDesc = (ev) => {
        setInputDesc(ev.target.value);
    };

    const [openAlert, setOpenAlert] = React.useState(false);
    const handleOpenAlert = () => {
        setOpenAlert(true);
    };
    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();

        if (inputTitle.trim() !== '' && inputDesc.trim() !== '') {
            let dateContent = `${dateValue.month() + 1}/${dateValue.date()}/${dateValue.year()} `
            let isChecked = false;
            let id = Date.now().toString(23);
            const content = { id, isChecked, dateContent, inputTitle, inputDesc };
            setInputTitle('');
            setInputDesc('');
            setTimeout(() => {
                props.changeOutput([...props.outputData, content]);
                props.displayModal(false)
            }, 0);
        }
        else {
            handleOpenAlert();
        }
    }

    const handleReset = () => {
        setInputTitle('');
        setInputDesc('');
    }

    React.useEffect(() => {
        if (props.type === "Task") localStorage.setItem(`taskData`, JSON.stringify(props.outputData));
        if (props.type === "Thought") localStorage.setItem(`thoughtData`, JSON.stringify(props.outputData));
    }, [props.outputData, props.type]);

    return (
        <form name={props.type} action="/" style={styles.root} onSubmit={handleSubmit} onReset={handleReset}>
            <Box sx={styles.container}>

                <LocalizationProvider dateAdapter={DateAdapter}>
                    <Box sx={{ width: '100%', gap: 2, flexWrap: 'wrap' }} display="flex" alignItems="center" justifyContent="center">
                        <DatePicker
                            label="Choose Date"
                            value={dateValue}
                            onChange={(newDateValue) => {
                                setDateValue(newDateValue);
                            }}
                            renderInput={(params) => <TextField {...params} helperText={params?.inputProps?.placeholder} />}
                        />
                        <FormControl variant="filled" sx={styles.inputTitle}>
                            <InputLabel htmlFor="component-title">{props.type} Title</InputLabel>
                            <FilledInput id="component-title" value={inputTitle} onChange={handleTitle} sx={{ pt: 0.5, fontSize: '1.75rem', width: '100%', }} />
                        </FormControl>

                    </Box>
                </LocalizationProvider>

                <FormControl variant="filled" sx={styles.inputs}>
                    <InputLabel htmlFor="component-desc">{props.type} Description</InputLabel>
                    <FilledInput id="component-desc" value={inputDesc} onChange={handleDesc} multiline minRows={5} maxRows={8} sx={{ pt: 3.5, fontSize: '1.15rem' }} />
                </FormControl>

                <Box sx={{ width: '100%', gap: 5 }} display="flex" justifyContent="center" alignItems="center">
                    <Button type="submit" variant="contained" color="success">
                        <Typography variant="button" fontWeight="bold">Submit</Typography>
                    </Button>
                    <Button type="reset" variant="contained" color="error">
                        <Typography variant="button" fontWeight="bold">Reset</Typography>
                    </Button>
                </Box>

                <Modal open={openAlert} onClose={handleCloseAlert}>
                    <Box sx={{ width: '100%', height: '100%' }}
                        display='flex'
                        justifyContent="center"
                        alignItems="center">
                        <Alert severity="warning" sx={{ display: 'flex', alignItems: 'center' }}>
                            Please write Title and Description for {props.type}s.
                            <IconButton variant="contained" color="warning" onClick={handleCloseAlert}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Alert>
                    </Box>
                </Modal>
            </Box>
        </form>
    )
}

export default InputForms
