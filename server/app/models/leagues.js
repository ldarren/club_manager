var
sqlUser = require('./sql/user'),
sqlPlayers = require('./sql/players'),
redisLeagues = require('./redis/leagues'),
memEsms = require('./mem/esms');

const
USER_MODEL_ID = G_SESSION.USER_DATA;

exports.add = function(session, order, cb){
    var
    model = session.getModel(USER_MODEL_ID),
    data = order.data,
    email = data[G_CONST.EMAIL],
    userData = data[email];

    redisLeagues.addTeam(userData.userId, function(err, leagueId){
        if (err) return cb(err);
        cb();
    });
};

exports.getLeague = function(session, order, cb){
    cb();
};

exports.updateLeague = function(session, order, cb){
/*    var
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
*/
    cb();
};
