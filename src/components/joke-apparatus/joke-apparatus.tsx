import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import CachedIcon from '@mui/icons-material/Cached';
import SendIcon from '@mui/icons-material/Send';
import { useGlobalContext } from "context/global-context";
import React from "react";
import styles from "./joke-apparatus.module.css";

type RandomJoke = {
    type: string,
    value: {
        categories: Array<string>,
        id: number,
        joke: string
    }
}

type SendJokeResponse = {
    message: string,
    invalidEmails: Array<string>
}

function JokeApparatus() {
    const { emails, joke, setJoke } = useGlobalContext();
    const [sending, setSending] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [showError, setShowError] = React.useState<boolean>(false);
    const currentJoke = React.useRef<string>(joke);

    const fetchNewJoke = React.useCallback(async () => {
        return new Promise<RandomJoke>((resolve, reject) => {
            fetch("http://api.icndb.com/jokes/random?escape=javascript")
                .then(response => {
                    if (!response.ok) reject(`${response.status}`);

                    resolve(response.json());
                })
                .catch(error => {
                    console.error(error);
                    setJoke("");
                    setErrorMessage("Failed to fetch new joke. Please check the console for details.");
                    setShowError(true);
                });
        })
    }, [setJoke]);

    const refreshJoke = React.useCallback(async () => {
        const response = await fetchNewJoke();

        setJoke(response.value.joke);
        currentJoke.current = response.value.joke;
    }, [setJoke, fetchNewJoke]);

    const sendMails = React.useCallback(async () => {
        setSending(true);

        const payload = { emails, joke};

        const response = await fetch("http://localhost:9000/send-mails", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        });

        if (response) {
            const status: number = response.status;
            const data: SendJokeResponse = await response.json();

            if (response.ok) {
                console.log(`Status: ${status}, Message: ${data.message}, Invalid Emails: ${data.invalidEmails.toString()}`);
            } else {
                console.error(data.message);
                setJoke("");
                setErrorMessage(data.message);
                setShowError(true);
            }
        }

        setSending(false);
    }, [joke, emails, setJoke]);

    React.useEffect(() => {
        if (!showError) return;

        const timeoutID = setTimeout(() => {
            setShowError(false);
            setErrorMessage("");
            setJoke(currentJoke.current);
        }, 5000);

        return () => {
            clearTimeout(timeoutID);
        }
    }, [showError, setJoke]);

    React.useEffect(() => {
        refreshJoke();
    }, [refreshJoke]);

    return (
        <Box p={1} sx={{border: 1, borderColor: grey[800], borderRadius: 2}}>
            <Box sx={{color: red[600]}} className={`${styles.jokeFetchError} ${showError ? styles.animate : ""}`}>
                <Typography>{errorMessage}</Typography>
            </Box>
            <Box p={1}>{joke}</Box>

            <Box display="flex" justifyContent="flex-end">
                <Button sx={{mx: 1}} onClick={refreshJoke} startIcon={<CachedIcon/>}>Fetch New Joke</Button>
                <LoadingButton sx={{mx: 1}} onClick={sendMails} loading={sending} loadingPosition="start" startIcon={<SendIcon/>}>
                    {sending ? (
                        <>Sending</>
                    ) : (
                        <>Send Jokes</>
                    )}
                </LoadingButton>
            </Box>
        </Box>
    )
}

export default JokeApparatus;