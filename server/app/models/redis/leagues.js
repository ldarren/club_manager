const
KEY_SCORE = 's:',               // user score
KEY_RANK = 'zR:',               // league ranking
KEY_LEAGUE_POPULATION = ':zLP:',  // league population
KEY_USER_2_LEAGUE = ':hU2L:';   // userId get leagueId

var
client,
getScoreKey = function(userId) { return KEY_SCORE + userId; },
getRankKey = function(leagueId) { return KEY_RANK + leagueId; },
createScore = function(clubName) { return JSON.stringify([0, clubName, 0, 0, 0, 0, 0, 0, 0, 0]); }
addToLeague = function(leagueId, userId, clubName, cb){
    client.multi()
    .set(getScoreKey(userId), createScore(clubName))
    .zadd(getRankKey(leagueId), 0, userId)
    .zincrby(KEY_LEAGUE_POPULATION, 1, leagueId)
    .hset(KEY_USER_2_LEAGUE, userId, leagueId)
    .exec(cb);
};

exports.setup = function(context, next){
    client = context.redisLeagues;
    next();
};

exports.add = function(userId, clubName, cb){
    client.zrange([KEY_LEAGUE_POPULATION, 0, 0, 'WITHSCORES'], function(err, list){
        if (err) return cb(err);
        var
        leagueId = parseInt(list[0]) || 0,
        count = parseInt(list[1]) || 0;
        if (!count || count >= 14) addToLeague(leagueId+1, userId, clubName, cb);
        else addToLeague(leagueId, userId, clubName, cb);
    });
};

exports.getLeague = function(userId, cb){
   client.hget(KEY_USER_2_LEAGUE, userId, function(err, leagueId){
       if (err) return cb(err);
       client.zrevrange(getRankKey(leagueId), 0, -1, function(err, userIds){
           if (err) return cb(err);
           var m = client.multi();
           for(var i=0, l=userIds.length; i<l; i++){
               m.get(getScoreKey(userIds[i]));
           }
           m.exec(function(err, table){
               if (err) return cb(err);
               for(var i=0, l=table.length; i<l; i++){
                   table[i] = JSON.parse(table[i]);
               }
               return cb(err, parseInt(leagueId), table);
           });
       });
   });
};

exports.getClubNames = function(userId, cb){
   client.hget(KEY_USER_2_LEAGUE, userId, function(err, leagueId){
       if (err) return cb(err);
       client.zrevrange(getRankKey(leagueId), 0, -1, function(err, userIds){
           if (err) return cb(err);
           var m = client.multi();
           for(var i=0, l=userIds.length; i<l; i++){
               m.get(getScoreKey(userIds[i]));
           }
           m.exec(function(err, table){
               if (err) return cb(err);

               var list = [], map = {}, name;
               for(var i=0, l=table.length; i<l; i++){
                   name = JSON.parse(table[i])[1];
                   list.push(name);
                   map[name] = parseInt(userIds[i]);
               }
               return cb(err, list, map);
           });
       });
   });
};

exports.updateLeague = function(leagueId, userId, score, cb){
    var rankKey = getRankKey(leagueId);
    
    client.multi()
    .zincrby(rankKey, score[9], userId)
    .set(getScoreKey(userId), JSON.stringify(score))
    .exec(cb);
};
