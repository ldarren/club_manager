module.exports = [
    require('./mem/gameSettings'),
    require('./mem/names'),
    require('./mem/esms'),

    require('./sql/users'),
    require('./sql/players'),

    require('./redis/users'),
    require('./redis/leagues'),
];
