var
client;

const
GET_BY_USERID = 'SELECT * FROM players WHERE userId = ?;',
SAVE = 'INSERT INTO players (userId, firstName, middleName, lastName, xp, level, age, stat, inc, createdAt) VALUES ',
SAVE_ARGS = '(?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())';

exports.setup = function(context, next){
    client = context.sqlUsers;
    next();
};

exports.save = function(args, cb){
    var
    members = args[0],
    userId = args[1],
    member,
    questions = [],
    params = [];

    for (var i=0, l=members.length; i<l; i++){
        member = members[i];
        if (!member) continue;
        questions.push(SAVE_ARGS);
        params.push(userId);
        params.push(member.fn, member.mn, member.ln, member.xp, member.level, member.age);
        params.push(JSON.stringify(member.stat));
        params.push(JSON.stringify(member.inc));
    }

    client.query(SAVE+questions.join(',')+';', params, cb);
};

exports.getByUserId = function(userId, cb){
    client.query(GET_BY_USERID, [userId], cb);
};
