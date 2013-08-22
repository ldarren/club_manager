Object.freeze(G_CONST = {
    JOBS: 'jobs', // not used juz to prevent same key is used
    LEAGUE: 'league',
    TEAM: 'team',
    FIXTURES: 'fixtures',
    MATCH: 'match',
    USER: 'user',
    PLAYERS: 'players',

    TEAM_AWAY: 'away',
    CLUB_NAME: 'club',
    EMAIL: 'email',
    CLUB_GROUND: 'ground',
    TEAM_HOME: 'home',
    MANAGER_NAME: 'name',
    MANAGER_NATION: 'nationality',
    PASSWORD: 'passw',
    STADIUM: 'stadium',
    TEAM: 'team',
    USER_ID: 'userId',
}); 

Object.freeze(G_API = {
    USER_CREATE: G_CONST.USER + G_CCONST.CREATE,
    USER_READ: G_CONST.USER + G_CCONST.READ,
    LEAGUE_READ: G_CONST.LEAGUE + G_CCONST.READ,
    FIXTURES_READ: G_CONST.FIXTURES + G_CCONST.READ,
    MATCH_CREATE: G_CONST.MATCH + G_CCONST.CREATE,

    LEAGUE_UPDATE: G_CONST.LEAGUE + G_CCONST.UPDATE,
    TEAM_CREATE: G_CONST.TEAM + G_CCONST.CREATE,
    TEAM_INIT: G_CONST.PLAYERS + G_CCONST.INIT,
    TEAM_READ: G_CONST.PLAYERS + G_CCONST.READ
});     
        
Object.freeze(G_SESSION = {
    JOBS: G_CONST.JOBS,
    LEAGUE_DATA: G_CONST.LEAGUE,
    TEAM_DATA: G_CONST.TEAM,
    FIXTURES_DATA: G_CONST.FIXTURES,
    MATCH_DATA: G_CONST.MATCH,
    USER_DATA: G_CONST.USER,
});

Object.freeze(G_SKILL = {
    ST: 0, // Shot Stopping *
    BH: 1, // Ball Handling
    RF: 2, // Reflexes
    TK: 3, // Tackle *
    MK: 4, // Marking
    HD: 5, // Heading
    PS: 6, // Passing *
    FL: 7, // Flair
    VS: 8, // Vision
    SH: 9, // Shooting *
    FH: 10, // Finishing
    CO: 11, // Composure
    MAX: 12
});
