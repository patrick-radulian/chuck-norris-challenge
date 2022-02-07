import { TableEntry } from "components/data-table/email-table";
import React from "react";

export type GlobalContext = {
    emails: Array<TableEntry>,
    setEmails: (emails: Array<TableEntry>) => void,
    emailInputValue: string,
    setEmailInputValue: (value: string) => void
}

export const AppGlobalContext = React.createContext<GlobalContext>({
    emails: [],
    setEmails: () => {},
    emailInputValue: "",
    setEmailInputValue: () => {}
});

export const useGlobalContext = () => React.useContext(AppGlobalContext);