import React from 'react';
import PropTypes from 'prop-types';

import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableFooter, TableRow, TablePagination,
    Paper, Box, Typography, Checkbox, useTheme, IconButton
} from '@mui/material';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
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
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}



TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};



function TableDisplay(props) {

    let [rows, setRows] = React.useState(props.outputContent);

    const [checked, setChecked] = React.useState(
        rows.length > 0 ? [...rows].map(row => row.isChecked) : [false]
    );

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAllCheckboxes = (ev) => {
        console.table(checked);
        [...rows].forEach(row => {
            row.isChecked = ev.target.checked;
        })
        setChecked([...checked].map(item => ev.target.checked))
    }

    const handleDeleteAllItems = (ev) => {
        let conf = window.confirm('This action will delete all items. Continue?');
        if (conf) {
            props.type === "Task"
                ? localStorage.setItem('taskData', [])
                : localStorage.setItem('thoughtData', []);
        }
    }

    const handleDeleteSingleItem = (ev) => {
        let conf = window.confirm('This action will delete this single item. Continue?');
        if (conf) {
            props.changeContent([...rows].filter(obj => obj.id !== ev.currentTarget.id));
        }
    }

    React.useEffect(() => {
        if (props.type === "Task") localStorage.setItem(`taskData`, JSON.stringify(rows));
        if (props.type === "Thought") localStorage.setItem(`thoughtData`, JSON.stringify(rows));
        setRows(props.outputContent);
    }, [rows, props.type, props.outputContent]);

    return (
        <TableContainer component={Paper}>
            <Table size="small" >
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={[...checked].every(item => item)}
                                onChange={handleAllCheckboxes}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h5">
                                Date
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h5">
                                Title
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h5">
                                Description
                            </Typography>
                        </TableCell>
                        <TableCell align="center" >
                            <IconButton variant="contained" color="error" onClick={handleDeleteAllItems}>
                                <DeleteForeverIcon fontSize="large" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row, index) => (
                        <TableRow key={row.id}>
                            <TableCell padding="checkbox">
                                <Checkbox checked={checked[index]} onChange={(ev) => {
                                    row.isChecked = ev.target.checked;
                                    setChecked([...checked].map((item, i) => {
                                        if (index === i) item = ev.target.checked;
                                        return item;
                                    }));
                                }} />
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1"
                                    sx={row.isChecked ? { textDecorationLine: 'line-through' } : { textDecorationLine: 'none' }}>
                                    {row.dateContent}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6"
                                    sx={row.isChecked ? { textDecorationLine: 'line-through' } : { textDecorationLine: 'none' }}>
                                    {row.inputTitle}
                                </Typography>
                            </TableCell>
                            <TableCell align="justify">
                                <Typography variant="body2"
                                    sx={row.isChecked ? { textDecorationLine: 'line-through' } : { textDecorationLine: 'none' }}>
                                    {row.inputDesc}
                                </Typography>
                            </TableCell>
                            <TableCell align="center" component="th" scope="row" >
                                <IconButton id={row.id} variant="contained" color="error" onClick={handleDeleteSingleItem} >
                                    <HighlightOffIcon fontSize="large" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 43 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={5}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default TableDisplay;
