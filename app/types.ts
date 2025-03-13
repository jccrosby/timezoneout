export type Team = {
    team: {
        name: string;
        abbreviation: string;
    };
};

export type Game = {
    teams: {
        away: Team;
        home: Team;
    };
    gameDate: string;
    officialDate: string;
};

export type ScheduleData = {
    dates: Array<{
        games: Game[];
    }>;
};
