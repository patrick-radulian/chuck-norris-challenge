import { Box, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useGlobalContext } from "context/global-context";
import React from "react";

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

    const fetchNewJoke = React.useCallback(async () => {
        const jk = await fetch("http://api.icndb.com/jokes/random");
        const data: RandomJoke = await jk.json();

        console.log(data);

        setJoke(data.value.joke);
    }, [setJoke]);

    const sendMails = React.useCallback(async () => {
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
            }
        }
    }, [joke, emails]);

    React.useEffect(() => {
        fetchNewJoke();
    }, [fetchNewJoke]);

    return (
        <Box p={1} sx={{border: 1, borderColor: grey[800], borderRadius: 2}}>
            <Box p={1}>{joke}</Box>

            <Box display="flex" justifyContent="flex-end">
                <Button sx={{mx: 1}} onClick={fetchNewJoke}>Fetch New Joke</Button>
                <Button sx={{mx: 1}} onClick={sendMails}>Send Jokes</Button>
            </Box>
        </Box>
    )
}

export default JokeApparatus;