var
sqlUsers = require('./sql/users'),
sqlPlayers = require('./sql/players'),
redisUsers = require('./redis/users'),
redisLeagues = require('./redis/leagues'),
memEsms = require('./mem/esms');

const
MODEL_ID = G_SESSION.USER_DATA;

exports.saveData = function(models, cb){
    var data = models[0];

    sqlUsers.save(data, function(err, info){
        if (err) return cb(err);
        var userId = info.insertId;
        data[G_CONST.USER_ID] = userId;
        sqlPlayers.save(data, function(err, info){
            if (err) return cb(err);
            var
            playerId = info.insertId,
            players = data[G_CONST.TEAM],
            player;

            for(var i=0,l=players.length; i<l; i++){
                player = players[i];
                player.playerId = playerId++;
            }
            
            redisLeagues.add(userId, data[G_CONST.CLUB_NAME], function(err){
                if(err) return cb(err);
                return cb(err, models);
            });
        });
    });
};

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
        exports,
        exports.saveData,
        G_PICO_WEB.RENDER_FULL,
        [[session.createModelInfo(MODEL_ID, email)]]
    );

    data[G_CONST.TEAM] = memEsms.rosterCreator();

    cb();
};

exports.loadTeam = function(session, order, cb){
    var
    data = order.data,
    userId = parseInt(data[G_CONST.USER_ID]);

    if (!userId) return cb('invalid params');

    sqlUsers.getByUsersId(userId, function(err, results){
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
            [[session.createModelInfo(MODEL_ID, email)]]
        );
        cb();
    });
};

exports.loadTeamByEmail = function(session, order, cb){
    var
    data = order.data,
    email = data[G_CONST.EMAIL];
    if (!email) return cb('invalid params');
    sqlUsers.getByEmail(email, function(err, results){
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
            [[session.createModelInfo(MODEL_ID, email)]]
        );
        cb();
    });
};
