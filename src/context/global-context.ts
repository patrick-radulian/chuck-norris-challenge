import React from "react";

export type GlobalContext = {
    emails: Array<string>,
    setEmails: (emails: Array<string>) => void,
    emailInputValue: string,
    setEmailInputValue: (value: string) => void,
    joke: string,
    setJoke: (joke: string) => void
}

export const AppGlobalContext = React.createContext<GlobalContext>({
    emails: [],
    setEmails: () => {},
    emailInputValue: "",
    setEmailInputValue: () => {},
    joke: "",
    setJoke: () => {}
});

export const useGlobalContext = () => React.useContext(AppGlobalContext);