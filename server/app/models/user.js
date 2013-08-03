var
redisUser = require('./redis/user'),
sqlUser = require('./sql/user');

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
        G_CCONST.CREATE,
        api,
        order.reqId,
        sqlUser,
        sqlUser.save,
        G_PICO_WEB.RENDER_FULL,
        [[{model:MODEL_ID, key:email}]],
        G_CONST.USER_ID
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
            G_CCONST.READ,
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
console.log('**************', email, G_CONST.EMAIL, JSON.stringify(data));
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
            G_CCONST.READ,
            order.api,
            order.reqId,
            undefined,
            undefined,
            G_PICO_WEB.RENDER_FULL,
            [[{modeId:MODEL_ID, key:email}]]
        );
        cb();
    });
};
