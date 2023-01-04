export interface Welcome {
    pageProps: PageProps;
    __N_SSP:   boolean;
}

export interface PageProps {
    initialLeague: InitialLeague;
}

export interface InitialLeague {
    createdAt:   Date;
    matches:     Match[];
    title:       string;
    teams:       TeamElement[];
    updatedAt:   Date;
    description: string;
    userId:      string;
    id:          string;
}

export interface Match {
    finished: boolean | null;
    teams:    { [key: string]: TeamValue };
    winner:   null | string;
}

export interface TeamValue {
    score: null | string;
}

export interface TeamElement {
    id:   string;
    name: string;
}