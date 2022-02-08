import React from 'react';
import styles from './App.module.css';
import { Box, Button, Container, Divider, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import EmailTable from 'components/email-table/email-table';
import { AppGlobalContext, GlobalContext } from 'context/global-context';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import isEmail from "validator/lib/isEmail";
import Header from 'components/header/header';
import JokeApparatus from 'components/joke-apparatus/joke-apparatus';



function App() {
    const [emails, setEmails] = React.useState<Array<string>>([]);
    const [emailInputValue, setEmailInputValue] = React.useState<string>("");
    const [joke, setJoke] = React.useState<string>("");
    const [inputHelperText, setInputHelperText] = React.useState<string>(" ");
    const [showConfirmation, setShowConfirmation] = React.useState<boolean>(false);

    const appContext: GlobalContext = {emails, setEmails, emailInputValue, setEmailInputValue, joke, setJoke};

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
        }, 2500);

        return () => {
            clearTimeout(timeoutID);
        }
    }, [showConfirmation]);

    return (
        <AppGlobalContext.Provider value={appContext}>
            <Container maxWidth="md" sx={{my: 4}}>
                <Header/>

                <Divider/>

                <Box textAlign="center" m={4}>
                    <Typography variant="h6">Who would you like to surprise today?</Typography>
                    <Typography variant="subtitle2">Enter the recepient's e-mail and add it to the list.</Typography>
                </Box>

                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item flexShrink={0} flexBasis={150}>1. Add E-mail Addresses</Grid>
                    <Grid item flex={1}>
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

                <Box m={2} textAlign="center">
                    <Typography variant="h4" color="#70BE44" className={`${styles.confirmation} ${showConfirmation ? styles.animate : ""}`}>E-mail address successfully added.</Typography>
                </Box>

                <Grid container gap={2}>
                    <Grid item flexShrink={0} flexBasis={150}>2. Regenerate or Send Joke</Grid>
                    <Grid item flex={1}><JokeApparatus/></Grid>
                </Grid>
            </Container>
        </AppGlobalContext.Provider>
    );
}

export default App;
