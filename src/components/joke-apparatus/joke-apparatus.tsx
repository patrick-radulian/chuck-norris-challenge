import { Box, Button } from "@mui/material";
import React from "react";

type RandomJoke = {
    type: string,
    value: {
        categories: Array<string>,
        id: number,
        joke: string
    }
}

function JokeApparatus() {
    const [currentJoke, setCurrentJoke] = React.useState<any>();

    const fetchNewJoke = React.useCallback(async () => {
        const jk = await fetch("http://api.icndb.com/jokes/random");
        const data: RandomJoke = await jk.json();

        console.log(data);

        setCurrentJoke(data.value.joke);
    }, []);

    const testAPI = React.useCallback(async () => {
        const response = await fetch("http://localhost:9000/testAPI");
        const data = await response.text();
        console.log(data);
    }, []);

    React.useEffect(() => {
        fetchNewJoke();
        testAPI();
    }, [fetchNewJoke, testAPI]);

    return (
        <Box>
            <div>{currentJoke}</div>
            <Button onClick={fetchNewJoke}>Fetch New Joke</Button>
        </Box>
    )
}

export default JokeApparatus;