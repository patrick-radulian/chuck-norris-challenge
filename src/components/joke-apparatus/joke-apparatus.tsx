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

    React.useEffect(() => {
        fetchNewJoke();
    }, [fetchNewJoke]);

    return (
        <Box>
            <div>{currentJoke}</div>
            <Button onClick={fetchNewJoke}>Fetch New Joke</Button>
        </Box>
    )
}

export default JokeApparatus;