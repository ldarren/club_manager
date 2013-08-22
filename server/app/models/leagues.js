var
sqlUsers = require('./sql/users'),
sqlPlayers = require('./sql/players'),
redisLeagues = require('./redis/leagues'),
memEsms = require('./mem/esms');

const
MODEL_ID = G_SESSION.LEAGUE_DATA,
FIXTURES_MODEL_ID = G_SESSION.FIXTURES_DATA,
MATCH_MODEL_ID = G_SESSION.MATCH_DATA,
USER_MODEL_ID = G_SESSION.USER_DATA;

exports.add = function(session, order, next){
    var
    model = session.getModel(USER_MODEL_ID),
    data = order.data,
    email = data[G_CONST.EMAIL],
    userData = data[email];

    redisLeagues.addTeam(userData.userId, function(err, leagueId){
        if (err) return next(err);
        next();
    });
};

exports.get = function(session, order, next){
    var userId = order.data[G_CONST.USER_ID];

    redisLeagues.getLeague(userId, function(err, leagueId, table){
        if (err) return next(err);

        var model = session.getModel(MODEL_ID);

        model[userId] = { id:leagueId, table:table };

        session.addJob(
            order.api,
            order.reqId,
            undefined,
            undefined,
            G_PICO_WEB.RENDER_FULL,
            [[{modelId:MODEL_ID, key:userId}]]
        );

        next();
    });
};

exports.makeFixture = function(session, order, next){
    var
    model = session.getModel(FIXTURES_MODEL_ID),
    data = order.data,
    userId = data[G_CONST.USER_ID];

    redisLeagues.getClubNames(userId, function(err, list, map){
        if (err) return next(err);

        model[userId] = { list: memEsms.fixtures(list), map: map };

        session.addJob(
            order.api,
            order.reqId,
            undefined,
            undefined,
            G_PICO_WEB.RENDER_FULL,
            [[session.createModelInfo(FIXTURE_MODEL_ID, userId)]]
        );

        next();

    });
};

exports.createMatch = function(session, order, next){
    var
    model = session.getModel(MATCH_MODEL_ID),
    data = order.data,
    userId1 = data[G_CONST.TEAM_HOME],
    userId2 = data[G_CONST.TEAM_AWAY];



    var
    league, team1, team2,
    n1 = team1.name,
    n2 = team2.name,
    r1 = team1.players,
    r2 = team2.players,
    ts1 = memEsms.tsc(n1, '442N', r1),
    ts2 = memEsms.tsc(n2, '442N', r2),
    report = memEsms.esms(ts1, ts2, r1, r2),
    result = memEsms.updtr(report, league, r1, r2);

    model['me'] = {result: report.teamInfo, comment: report.commentary, league:result.leagueTable};

    session.addJob(
        order.api,
        order.reqId,
        undefined,
        undefined,
        G_PICO_WEB.RENDER_FULL,
        [[session.createModelInfo(MATCH_MODEL_ID, userId)]]
    );

    next();
}

exports.updateLeague = function(session, order, next){
/*    var
    model = session.getModel(MODEL_ID),
    data = order.data,
    api = order.api,
    email = data[G_CONST.EMAIL];

    if (model[email]) return next('already own a team');

    if (
        !data[G_CONST.MANAGER_NAME] || 
        !data[G_CONST.MANAGER_NATION] || 
        !data[G_CONST.CLUB_NAME] || 
        !data[G_CONST.CLUB_GROUND]
        )
        return next('Not enough parameter');
    
    model[email] = data;

    session.addJob(
        api,
        order.reqId,
        sqlUsers,
        sqlUsers.save,
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
    next();
};
