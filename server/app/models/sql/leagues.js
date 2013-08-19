var
client;

const
GET_MAX = 'SELECT MAX(leagueId) FROM leagues';

exports.setup = function(context, next){
    client = context.sqlLeagues;
    next();
};
