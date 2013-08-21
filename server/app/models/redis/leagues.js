const
EMPTY_SCORE = JSON.stringify({mp:0, w:0, d:0, l:0, gf:0, ga:0, gd:0, pt:0});
KEY_SCORE = 's:',               // user score
KEY_RANK = 'zR:',               // league ranking
KEY_LEAGUE_POPULATION = ':zLP:',  // league population
KEY_USER_2_LEAGUE = ':hU2L:';   // userId get leagueId

var
client,
getScoreKey = function(userId) { return KEY_SCORE + userId; },
getRankKey = function(leagueId) { return KEY_RANK + leagueId; },
addToLeague = function(leagueId, userId, cb){
    var m = client.multi();
    m
    .set(getScoreKey(userId), EMPTY_SCORE)
    .zadd(getRankKey(leagueId), 0, userId)
    .zincrby(KEY_LEAGUE_POPULATION, 1, leagueId)
    .hset(KEY_USER_2_LEAGUE, userId, leagueId)
    .exec(cb);
};

exports.setup = function(context, next){
    client = context.redisLeagues;
    next();
};

exports.add = function(userId, cb){
    client.zrange([KEY_LEAGUE_POPULATION, 0, 0, 'WITHSCORES'], function(err, list){
        if (err) return cb(err);
        var
        leagueId = parseInt(list[0]) || 0,
        count = parseInt(list[1]) || 0;
        if (!count || count >= 14) addToLeague(leagueId+1, userId, cb);
        else addToLeague(leagueId, userId, cb);
    });
};

exports.getLeague = function(userId, cb){
};

exports.updateLeague = function(userId, league, cb){
};
