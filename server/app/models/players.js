var
memNames = require('../models/mem/names'),
sqlPlayers = require('./sql/players');

const
MODEL_ID = G_SESSION.PLAYER_DATA;

exports.createTeamMembers = function(session, order, teamSize, baseStat, focusStat, minAge, cb){
    var
    api = order.api,
    userModel = session.getModel(G_SESSION.USER),
    email = userModel[G_CONST.EMAIL],
    model = session.getModel(MODEL_ID),
    members = [],
    stat, inc, currStat, currStatValue, availPt, ageRange, name;

    for(var i=0, l=teamSize; i<l; i++){
        ageRange = Math.floor(Math.random() * 7);
        name = memNames.createName();
        stat = [1,1,1,1,1,1,1,1,1,1,1,1];
        inc = [1,1,1,1,1,1,1,1,1,1,1,1];

        availPt = baseStat - G_SKILL.MAX;
        for(var j=0, k=focusStat; j<k; j++){
            currStat = Math.floor(Math.random()*G_SKILL.MAX);
            currStatValue = Math.ceil(Math.random()*(availPt - (focusStat - j - 1)));
            stat[currStat] += currStatValue;
            availPt -= currStatValue;
        }
        stat[currStat] += availPt;

        members.push({fn:name[0], mn:name[1], ln:name[2], xp:0, level:1, age: minAge + ageRange, stat: stat, inc: inc});
    }

    model[email] = members;

    session.addJob(
        G_CCONST.CREATE,
        api,
        order.reqId,
        sqlPlayers,
        sqlPlayers.save,
        G_PICO_WEB.RENDER_FULL,
        [[{modelId:MODEL_ID, key:email},{modelId:G_SESSION.USER, key:email}]]
    );

    cb();
};

exports.loadTeamMembers = function(session, order, cb){
    var
    data = order.data
    userId = parseInt(data[G_CONST.USER_ID]);

    if (!userId) return cb('invalid params');

    sqlPlayers.getByUserId(userId, function(err, results){
        if (err) return cb(err);
        var
        model = session.getModel(MODEL_ID),
        members = [],
        r;

        for(var i=0, l=results.length; i<l; i++){
            r = results[i];
            members.push({fn:r.firstName, mn:r.middleName, ln:r.lastName, xp:r.xp, level:r.level, age: r.age, stat: JSON.parse(r.stat), inc: JSON.parse(r.inc)});
        }
        model[userId] = members;

        session.addJob(
            G_CCONST.READ,
            order.api,
            order.reqId,
            undefined,
            undefined,
            G_PICO_WEB.RENDER_FULL,
            [[{modelId:MODEL_ID, key:userId}]]
        );

        cb();
    });
};
