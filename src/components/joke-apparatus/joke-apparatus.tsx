import { Box, Button } from "@mui/material";
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
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const status = response.status;
        const data: SendJokeResponse = await response.json();
        console.log(`Status: ${status}, Message: ${data.message}, Invalid Emails: ${data.invalidEmails.toString()}`);
    }, [joke, emails]);

    React.useEffect(() => {
        fetchNewJoke();
    }, [fetchNewJoke]);

    return (
        <Box>
            <div>{joke}</div>
            <Button onClick={fetchNewJoke}>Fetch New Joke</Button>
            <Button onClick={sendMails}>Send Jokes</Button>
        </Box>
    )
}

export default JokeApparatus;