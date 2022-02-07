import { Container, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Box } from '@mui/system';
import { AppGlobalContext, GlobalContext, useGlobalContext } from 'context/global-context';
import React from 'react';
import './App.css';





function App() {
    const [emails, setEmails] = React.useState<Array<string>>(["patrick.radulian@gmail.com"]);
    const [emailInputValue, setEmailInputValue] = React.useState<string>("");

    const appContext: GlobalContext = {
        emails,
        setEmails,
        emailInputValue,
        setEmailInputValue
    }

    return (
        <AppGlobalContext.Provider value={appContext}>
            <Container maxWidth="md">
                <Box m={4}>
                    <Typography variant='h5' fontFamily="Lora" fontWeight={300} align='center'>Welcome to the <em>dadochunda</em> <Typography display="inline" color={blue[400]}>noun</Typography></Typography>
                    <Typography align='center' color={blue[200]}>\ 'da • də • chun, • də \</Typography>
                    <Typography align='center' variant='subtitle2' fontFamily="Lora" fontWeight={300}><em>(<u>da</u>ily <u>do</u>se of <u>Chu</u>ck <u>N</u>orris <u>d</u>elivery <u>a</u>pparatus)</em></Typography>
                </Box>

                <Typography>{emails.toString()}</Typography>

                <TextField label="Add E-mail address" value={emailInputValue} fullWidth/>
            </Container>
        </AppGlobalContext.Provider>
    );
}

export default App;
