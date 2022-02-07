import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export type TableEntry = {
    email: string
}

export type TableProps = {
    tableData: Array<TableEntry>
}

type DestructuredData = {
    email: string,
    name: string,
    domain: string
}


export default function EmailTable(props: TableProps) {
    const [page, setPage] = React.useState(0);

    const rowsPerPage: number = 10;

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => setPage(newPage);

    const destructuredData: Array<DestructuredData> = props.tableData.map(entry => {
        const splitRegExp = new RegExp("(?=[<@])");
        const splitEmailArray = entry.email.split(splitRegExp);
        const splitNameArray = splitEmailArray[0].split(".");
        const capitalizedNameArray = splitNameArray.map(namePart => `${namePart[0].toUpperCase()}${namePart.slice(1)}`);

        return {
            email: entry.email,
            name: capitalizedNameArray.toString().replaceAll(",", " "),
            domain: splitEmailArray[1],
        }
    });

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 450 }} aria-labelledby="tableTitle">
                        <TableHead>
                            <TableRow>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Domain</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {destructuredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((entry, index) => (
                                <TableRow tabIndex={-1} key={index}>
                                    <TableCell>{entry.email}</TableCell>
                                    <TableCell>{entry.name}</TableCell>
                                    <TableCell>{entry.domain}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination component="div" count={props.tableData.length} rowsPerPageOptions={[rowsPerPage]} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage}/>
            </Paper>
        </Box>
    );
}