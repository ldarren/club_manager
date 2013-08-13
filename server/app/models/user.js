var
redisUser = require('./redis/user'),
sqlUser = require('./sql/user'),
sqlPlayers = require('./sql/players'),
memEsms = require('./mem/esms');

const
MODEL_ID = G_SESSION.USER_DATA;

exports.create = function(session, order, cb){
    var
    model = session.getModel(MODEL_ID),
    data = order.data,
    api = order.api,
    email = data[G_CONST.EMAIL];

    if (model[email]) return cb('already own a team');

    if (
        !data[G_CONST.MANAGER_NAME] || 
        !data[G_CONST.MANAGER_NATION] || 
        !data[G_CONST.CLUB_NAME] || 
        !data[G_CONST.CLUB_GROUND]
        )
        return cb('Not enough parameter');
    
    model[email] = data;

    session.addJob(
        api,
        order.reqId,
        sqlUser,
        sqlUser.save,
        G_PICO_WEB.RENDER_FULL,
        [[{modelId:MODEL_ID, key:email}]],
        G_CONST.USER_ID
    );

    data[G_CONST.TEAM] = memEsms.rosterCreator();

    session.addJob(
        api,
        order.reqId,
        sqlPlayers,
        sqlPlayers.save,
        G_PICO_WEB.RENDER_NO,
        [[{modelId:MODEL_ID, key:email}]]
    );

    cb();
};

exports.loadTeam = function(session, order, cb){
    var
    data = order.data,
    userId = parseInt(data[G_CONST.USER_ID]);

    if (!userId) return cb('invalid params');

    sqlUser.getByUserId(userId, function(err, results){
        if (err) return cb(err);
        var
        result = results[0],
        model = session.getModel(MODEL_ID);
        email = result[G_CONST.EMAIL];
        
        model[email] = result;

        session.addJob(
            order.api,
            order.reqId,
            undefined,
            undefined,
            G_PICO_WEB.RENDER_NO,
            [[{modelId:MODEL_ID, key:email}]]
        );
        cb();
    });
};

exports.loadTeamByEmail = function(session, order, cb){
    var
    data = order.data,
    email = data[G_CONST.EMAIL];
    if (!email) return cb('invalid params');
    sqlUser.getByEmail(email, function(err, results){
        if (err) return cb(err);
        if (!results.length) return cb('email not found:'+email);
        var
        userInfo = results[0],
        email = userInfo[G_CONST.EMAIL],
        model = session.getModel(MODEL_ID);

        model[email] = userInfo;

        data[G_CONST.USER_ID] = userInfo[G_CONST.USER_ID];

        session.addJob(
            order.api,
            order.reqId,
            undefined,
            undefined,
            G_PICO_WEB.RENDER_FULL,
            [[{modelId:MODEL_ID, key:email}]]
        );
        cb();
    });
};
