var
client;

const
GET_BY_USERID = 'SELECT * FROM players WHERE userId = ?;',
SAVE = 'INSERT INTO players (userId, name, nationality, age, pref_side, sh, st, tk, ps, stamina, ag, sh_ab, st_ab, tk_ab, ps_ab, games, saves, tackles, keypasses, shots, goals, assists, dp, injury, suspension, fitness, createdAt) VALUES ',
SAVE_ARGS = '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())';

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
