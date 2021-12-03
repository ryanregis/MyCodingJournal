import * as React from 'react'
import { Typography, Box, IconButton, Modal, ThemeProvider, useTheme } from '@mui/material';

import TableDisplay from './TableDisplay';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import InputForms from './InputForms';


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

function Tasks(props) {

    const theme = useTheme();

    let outputData = localStorage.getItem('taskData')
        ? JSON.parse(localStorage.getItem('taskData'))
        : [];

    const [output, setOutput] = React.useState(outputData);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{ height: '80vh', p: 0, mb: 5 }}>
            <ThemeProvider theme={theme}>
                {props.mobile
                    ?

                    <IconButton sx={{ position: 'absolute', bottom: '3%', right: '2.5%', fontSize: 'clamp(1rem, 7.5vmax, 100px)' }} variant="contained" color="secondary" aria-label="Add Task" onClick={handleOpen}>
                        <AddCircleIcon fontSize="inherit" />
                    </IconButton>

                    :

                    <IconButton sx={{ position: 'absolute', top: '3%', left: '3%', fontSize: 'clamp(1rem, 3.5vmax, 100px)' }} variant="contained" color="secondary" aria-label="Add Task" onClick={handleOpen}>
                        <AddCircleIcon fontSize="inherit" />
                    </IconButton>
                }

                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={modalStyle}>
                        <IconButton sx={{ alignSelf: 'flex-end', fontSize: 'clamp(1.5rem, 2.5vmax, 100px)' }} variant="contained" color="error" aria-label="Add Task" onClick={handleClose}>
                            <CancelIcon fontSize="inherit" />
                        </IconButton>
                        <Typography variant="h5" fontWeight='bold' color="text.primary" align="center">
                            Add New Task
                        </Typography>
                        <InputForms type="Task" displayModal={setOpen} changeOutput={setOutput} outputData={output} />
                    </Box>
                </Modal>

                <TableDisplay type="Task" outputContent={output} changeContent={setOutput} />
            </ThemeProvider>
        </Box>
    )
}

export default Tasks
