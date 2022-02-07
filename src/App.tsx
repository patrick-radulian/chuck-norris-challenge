import { Button, Container, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Box } from '@mui/system';
import EmailTable, { TableEntry } from 'components/data-table/email-table';
import { AppGlobalContext, GlobalContext, useGlobalContext } from 'context/global-context';
import React from 'react';
import './App.css';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';



const tableData: Array<TableEntry> = [
    { email: "patrick.alexander.radulian@gmail.com" },
    { email: "brigitta.lorenz@icloud.com" },
    { email: "alexander.boris@gmail.com" },
    { email: "lenamaria.urban@icloud.com" }
];



function App() {
    const [emails, setEmails] = React.useState<Array<string>>(["patrick.radulian@gmail.com"]);
    const [emailInputValue, setEmailInputValue] = React.useState<string>("");

    const appContext: GlobalContext = {emails, setEmails, emailInputValue, setEmailInputValue}

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmailInputValue(event.target.value);

    return (
        <AppGlobalContext.Provider value={appContext}>
            <Container maxWidth="md">
                <Box m={4}>
                    <Typography variant='h5' fontFamily="Lora" fontWeight={300} align='center'>Welcome to the <em>dadochunda</em> <Typography display="inline" color={blue[400]}>noun</Typography></Typography>
                    <Typography align='center' color={blue[200]}>\ 'da • də • chun, • də \</Typography>
                    <Typography align='center' variant='subtitle2' fontFamily="Lora" fontWeight={300}><em>(<u>da</u>ily <u>do</u>se of <u>Chu</u>ck <u>N</u>orris <u>d</u>elivery <u>a</u>pparatus)</em></Typography>
                </Box>

                <EmailTable tableData={tableData}/>

                <Grid container alignItems="center" spacing={2}>
                    <Grid item flexGrow={1}>
                        <TextField size='small' label="Add E-mail address" value={emailInputValue} onChange={handleChange} fullWidth InputProps={{startAdornment: (<InputAdornment position='start'><EmailRoundedIcon/></InputAdornment>)}}/>
                    </Grid>
                    <Grid item flexShrink={0}>
                        <Button variant="contained">Add Email</Button>
                    </Grid>
                </Grid>
            </Container>
        </AppGlobalContext.Provider>
    );
}

export default App;
