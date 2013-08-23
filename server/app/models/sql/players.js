var
client;

const
GET_BY_USERID = 'SELECT * FROM players WHERE userId = ?;',
SAVE = 'INSERT INTO players (userId, name, nationality, age, pref_side, sh, st, tk, ps, stamina, ag, sh_ab, st_ab, tk_ab, ps_ab, games, saves, tackles, keypasses, shots, goals, assists, dp, injury, suspension, fitness, createdAt) VALUES ',
SAVE_ARGS = '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
UPDATE = 'UPDATE players SET stamina=?, minutes=minutes+?, saves=?, tackles=?, keypasses=?, assists=?, shots=?, goals=?, yellowcards=?, redcards=?, injury=?, st_ab=st_ab+?, tk_ab=tk_ab+?, ps_ab=ps_ab+?, sh_ab=sh_ab+?, fitness=? WHERE userId=? and name=?';

exports.setup = function(context, next){
    client = context.sqlUsers;
    next();
};

exports.save = function(data, cb){
    var
    members = data[G_CONST.TEAM],
    userId = data[G_CONST.USER_ID],
    member,
    questions = [],
    params = [];

    for (var i=0, l=members.length; i<l; i++){
        member = members[i];
        if (!member) continue;
        questions.push(SAVE_ARGS);
        params.push(userId);
        params.push(member.name, member.nationality, member.age, member.pref_side, member.sh, member.st, member.tk, member.ps);
        params.push(member.stamina, member.ag, member.sh_ab, member.st_ab, member.tk_ab, member.ps_ab);
        params.push(member.games, member.saves, member.tackles, member.keypasses, member.shots, member.goals, member.assists, member.dp);
        params.push(member.injury, member.suspension, member.fitness);
    }

    client.query(SAVE+questions.join(',')+';', params, cb);
};

exports.getByUserId = function(userId, cb){
    client.query(GET_BY_USERID, [userId], cb);
};

exports.update = function(userId, keys, players, cb){
    if (!keys.length) return cb();
    var
    name = keys.pop(),
    stats = players[name],
// stats
// samples: [ 'FWC', 'C', 3, 6, 7, 14, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100 ]
// pos, pref_side, st, tk, ps, sh, stamina, minutes, saves, tackles, keypasses, assists, shots, goals, yellowcards, redcards, injured, st_ab, tk_ab, ps_ab, sh_ab, fatique
    params = stats.slice(6);

    params.push(userId);
    params.push(name);

    client.query(UPDATE, params, function(err){
        if (err) return cb(err);
        exports.update(userId, keys, players, cb);
    });
};
