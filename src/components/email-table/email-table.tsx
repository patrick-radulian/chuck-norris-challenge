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



export type TableProps = {
    tableData: Array<string>
}

type DestructuredData = {
    email: string,
    name: string,
    domain: string
}



function EmailTable(props: TableProps) {
    const [page, setPage] = React.useState(0);

    const rowsPerPage: number = 5;
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - props.tableData.length);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => setPage(newPage);

    const destructuredData: Array<DestructuredData> = props.tableData.map(email => {
        const splitRegExp = new RegExp("(?=[<@])");
        const splitEmailArray = email.split(splitRegExp);
        const splitNameArray = splitEmailArray[0].split(".");
        const capitalizedNameArray = splitNameArray.map(namePart => `${namePart[0].toUpperCase()}${namePart.slice(1)}`);

        return {
            email,
            name: capitalizedNameArray.toString().replaceAll(",", " "),
            domain: splitEmailArray[1],
        }
    });

    const sortData = (a: DestructuredData, b: DestructuredData) => {
        const domainA = a.domain.toLowerCase();
        const domainB = b.domain.toLowerCase();

        if (domainA < domainB) {
            return -1;
        }
        if (domainA > domainB) {
            return 1;
        }
        return a.name.localeCompare(b.name);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 450 }} size="small" aria-labelledby="tableTitle">
                        <TableHead>
                            <TableRow>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Domain</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {destructuredData.sort(sortData).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((entry, index) => (
                                <TableRow tabIndex={-1} key={index}>
                                    <TableCell>{entry.email}</TableCell>
                                    <TableCell>{entry.name}</TableCell>
                                    <TableCell>{entry.domain}</TableCell>
                                </TableRow>
                            ))}

                            {destructuredData.length === 0 && (
                                <TableRow tabIndex={-1}>
                                    <TableCell colSpan={3}>No recepients yet</TableCell>
                                </TableRow>
                            )}

                            {emptyRows > 0 && (
                                <TableRow sx={{height: 33 * (destructuredData.length === 0 ? (emptyRows - 1) : emptyRows)}}>
                                    <TableCell colSpan={3} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination component="div" count={props.tableData.length} rowsPerPageOptions={[rowsPerPage]} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage}/>
            </Paper>
        </Box>
    );
}

export default EmailTable;