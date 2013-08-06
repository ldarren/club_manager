module.exports = [
    require('./mem/gameSettings'),
    require('./mem/names'),
    require('./mem/esms'),

    require('./sql/user'),
    require('./sql/players'),

    require('./redis/user'),
];
