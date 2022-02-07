import { Button, Container, Divider, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Box } from '@mui/system';
import EmailTable from 'components/data-table/email-table';
import { AppGlobalContext, GlobalContext } from 'context/global-context';
import React from 'react';
import './App.css';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import isEmail from "validator/lib/isEmail";



const initialTableData: Array<string> = [
    // "patrick.alexander.radulian@gmail.com",
    // "brigitta.lorenz@icloud.com",
    // "alexander.boris@gmail.com",
    // "lenamaria.urban@icloud.com"
];



function App() {
    const [emails, setEmails] = React.useState<Array<string>>(initialTableData);
    const [emailInputValue, setEmailInputValue] = React.useState<string>("");
    const [inputHelperText, setInputHelperText] = React.useState<string>(" ");
    const [showConfirmation, setShowConfirmation] = React.useState<boolean>(false);

    const appContext: GlobalContext = {emails, setEmails, emailInputValue, setEmailInputValue}

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailInputValue(event.target.value);

        if (event.target.value === "") setInputHelperText(" ");
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") handleAddEmail();
    }

    const handleAddEmail = (event?: React.FormEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
        const isValid = isEmail(emailInputValue);

        if (isValid) {
            if (emails.find(email => email === emailInputValue)) {
                setInputHelperText("This e-mail address has already been added.")
            } else {
                setEmails(prevEmails => [...prevEmails, emailInputValue]);
                setInputHelperText(" ");
                setEmailInputValue("");
                setShowConfirmation(true);
            }
        } else {
            setInputHelperText("Please enter a valid e-mail address.");
        }
    }

    React.useEffect(() => {
        if (!showConfirmation) return;

        const timeoutID = setTimeout(() => {
            setShowConfirmation(false);
        }, 2000);

        return () => {
            clearTimeout(timeoutID);
        }
    }, [showConfirmation]);

    return (
        <AppGlobalContext.Provider value={appContext}>
            <Container maxWidth="md">
                <Box m={4}>
                    <Typography variant='h5' fontFamily="Lora" fontWeight={300} align='center'>
                        Welcome to the <em>dadochunda </em>
                        <Typography display="inline" color={blue[400]}>noun</Typography>
                    </Typography>

                    <Typography align='center' color={blue[200]}>\ 'da • də • chun, • də \</Typography>

                    <Typography align='center' variant='subtitle2' fontFamily="Lora" fontWeight={300}>
                        <em>(<u>da</u>ily <u>do</u>se of <u>Chu</u>ck <u>N</u>orris <u>d</u>elivery <u>a</u>pparatus)</em>
                    </Typography>
                </Box>

                <Divider/>

                <Box textAlign="center" m={4}>
                    <Typography variant="h6">Who would you like to surprise today?</Typography>
                    <Typography variant="subtitle2">Enter the recepient's e-mail and add it to the list.</Typography>
                </Box>

                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item flexGrow={1}>
                        <TextField
                            size='small'
                            label="Add E-mail address"
                            value={emailInputValue}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            helperText={inputHelperText}
                            fullWidth
                            InputProps={{startAdornment: (<InputAdornment position='start'><EmailRoundedIcon/></InputAdornment>)}}
                        />
                    </Grid>
                    <Grid item flexShrink={0}>
                        <Button variant="contained" onClick={handleAddEmail}>Add Email</Button>
                    </Grid>
                </Grid>

                <EmailTable tableData={emails}/>

                <Box textAlign="center">
                    <Typography variant="h4" color="#70BE44" className={`confirmation ${showConfirmation ? "animate" : ""}`}>E-mail address successfully added.</Typography>
                </Box>
            </Container>
        </AppGlobalContext.Provider>
    );
}

export default App;
