const
EMPTY_TEAM = JSON.stringify({mp:0, w:0, d:0, l:0, gf:0, ga:0, gd:0, pt:0});
KEY_TEAM = 't:',
KEY_TEAM_SORTED = 'zT:',
KEY_LEAGUE_SORTED = ':zL:',
KEY_LEAGUE_SET = 'sL:',
KEY_USER_2_LEAGUE = ':hU2L:';

var
client,
getTeamKey = function(userId) { return KEY_TEAM + userId; },
getTeamSortedKey = function(leagueId) { return KEY_TEAM_SORTED + leagueId; },
getLeagueSetKey = function(leagueId){ return KEY_LEAGUE_SET+leagueId; },
addToLeague = function(leagueId, userId, count, cb){
    var m = client.multi();
    m
    .set(getTeamKey(userId), EMPTY_TEAM)
    .zadd(getTeamSortedKey(leagueId), 0, userId)
    .zadd(KEY_LEAGUE_SORTED, count+1, leagueId)
    .sadd(getLeagueSetKey(leagueId), userId)
    .hset(KEY_USER_2_LEAGUE, userId, leagueId)
    .exec(err, cb);
};

exports.setup = function(context, next){
    client = context.redisLeagues;
    next();
};

exports.addTeam = function(userId, cb){
    client.zrange(KEY_LEAGUE_SORTED, 0, 1, 'WITHSCORES', function(err, leagueId, count){
        if (err) return cb(err);
        leagueId = leagueId || 0;
        if (!count || count >= 14) addToLeague(leagueId+1, userId, 0, cb);
        addToLeague(leagueId, userId, count, cb);
    });
};

exports.getLeague = function(userId, cb){
};

exports.updateLeague = function(userId, league, cb){
};
