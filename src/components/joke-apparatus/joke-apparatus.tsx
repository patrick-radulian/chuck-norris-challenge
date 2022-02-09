import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
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

type Status = {
    message: string,
    type: "success" | "error"
}

function JokeApparatus() {
    const { emails, joke, setJoke } = useGlobalContext();
    const [sending, setSending] = React.useState<boolean>(false);
    const [status, setStatus] = React.useState<Status>({message: "", type: "success"});
    const [showStatus, setShowStatus] = React.useState<boolean>(false);

    const fetchNewJoke = React.useCallback(async () => {
        return new Promise<RandomJoke>((resolve, reject) => {
            fetch("http://api.icndb.com/jokes/random?escape=javascript")
                .then(response => {
                    if (!response.ok) reject(`${response.status}`);

                    resolve(response.json());
                })
                .catch(error => {
                    console.error(error);
                    setStatus({message: "Failed to fetch new joke. Please check the console for details.", type: "error"});
                    setShowStatus(true);
                });
        })
    }, []);

    const refreshJoke = React.useCallback(async () => {
        const response = await fetchNewJoke();
        setJoke(response.value.joke);
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
                setStatus({message: data.message, type: "success"});
                setShowStatus(true);
            } else {
                console.error(data.message);
                setStatus({message: data.message, type: "error"});
                setShowStatus(true);
            }
        }

        setSending(false);
    }, [joke, emails]);

    React.useEffect(() => {
        if (!showStatus) return;

        const timeoutID = setTimeout(() => {
            setShowStatus(false);
        }, 5000);

        return () => {
            clearTimeout(timeoutID);
        }
    }, [showStatus]);

    React.useEffect(() => {
        refreshJoke();
    }, [refreshJoke]);

    return (
        <Box sx={{border: 1, borderColor: grey[800], borderRadius: 2}}>
            {showStatus ? (
                <Box p={2} sx={{color: status.type === "error" ? red[600] : green[400]}} className={`${styles.jokeFetchError}`}>
                    <Typography>{status.message}</Typography>
                </Box>
            ) : (
                <Box p={2}>{joke}</Box>
            )}

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