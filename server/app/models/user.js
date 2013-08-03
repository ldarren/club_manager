var
redisUser = require('./redis/user'),
sqlUser = require('./sql/user');

const
MODEL_ID = G_SESSION.USER;

exports.create = function(session, order, cb){
    var
    model = session.getModel(MODEL_ID),
    data = order.data,
    api = order.api,
    args = G_ARGS[api],
    userId = data[G_CONST.USER_ID],
    userInfo = model[userId],
    arg;

    if (userInfo) return cb('already own a team');
    userInfo = {};

    if (
        !data[G_CONST.MANAGER_NAME] || 
        !data[G_CONST.MANAGER_NATION] || 
        !data[G_CONST.CLUB_NAME] || 
        !data[G_CONST.CLUB_GROUND]
        )
        return cb('Not enough parameter');

    for(var i=0, l=args.length; i<l; i++){
        arg = args[i];
        userInfo[arg] = data[arg];
    }
    model[userId] = userInfo;

    session.addJob(
        G_CCONST.CREATE,
        api,
        order.reqId,
        sqlUser,
        sqlUser.save,
        G_PICO_WEB.RENDER_FULL,
        [[model:MODEL_ID, key:userId]],
        G_CONST.USER_ID
    );

    cb();
};

exports.loadTeam = function(session, order, cb){
    var
    data = order[G_CONST.DATA],
    userId = parseInt(data[G_CONST.USER_ID]);

    if (!userId) return cb('invalid params');

    sqlUser.getByUserId(userId, function(err, results){
        if (err) return cb(err);
        var
        result = results[0],
        model = session.getModel(MODEL_ID),
        userId = result[G_CONST.USER_ID];
        
        model[userId] = result;

        session.addJob(
            G_CCONST.READ,
            order.api,
            order.reqId,
            undefined,
            undefined,
            G_PICO_WEB.RENDER_NO,
            [[{modelId:MODEL_ID, key:userId}]]
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
console.log('err', err, results);
        if (err) return cb(err);
        if (!results.length) return cb('email not found:'+email);
        var
        userInfo = results[0],
        userId = userInfo[G_CONST.USER_ID],
        model = session.getModel(MODEL_ID);

        model[userId] = userInfo;

        order.data[G_CONST.USER_ID] = userId;

        session.addJob(
            G_CONST.READ,
            order[G_CONST.API],
            order[G_CONST.REQ_ID],
            undefined,
            undefined,
            G_PICO_WEB.RENDER_FULL,
            [[{modeId:MODEL_ID, key:userId}]]
        );
        cb();
    });
};
