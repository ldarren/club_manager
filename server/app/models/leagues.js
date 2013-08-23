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
            [[session.createModelInfo(MODEL_ID, userId)]]
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
            [[session.createModelInfo(FIXTURES_MODEL_ID, userId)]]
        );

        next();

    });
};

exports.createMatch = function(session, order, next){
    var
    model = session.getModel(MATCH_MODEL_ID),
    data = order.data,
    home = data[G_CONST.TEAM_HOME],
    away = data[G_CONST.TEAM_AWAY],
    homeUserId = home[G_CONST.USER_ID],
    awayUserId = away[G_CONST.USER_ID],
    homeName = home[G_CONST.CLUB_NAME],
    awayName = away[G_CONST.CLUB_NAME];

    sqlPlayers.getByUserId(homeUserId, function(err, r1){
        if (err) return next(err);
        sqlPlayers.getByUserId(awayUserId, function(err, r2){
            if (err) return next(err);

            redisLeagues.getLeague(homeUserId, function(err, leagueId, table){
                if (err) return next(err);

                var
                ts1 = memEsms.tsc(homeName, '442N', r1),
                ts2 = memEsms.tsc(awayName, '442N', r2),
                report = memEsms.esms(ts1, ts2, r1, r2),
                result = memEsms.updtr(report, table, r1, r2),
                leagueTable = result.leagueTable,
                score, homeScore, awayScore;

                for(var i=0,l=leagueTable.length; i<l; i++){
                    score = leagueTable[i];
                    if (score[1] === homeName) homeScore = score;
                    if (score[1] === awayName) awayScore = score;
                    if (homeScore && awayScore) break;
                }

                var key = homeUserId+':'+awayUserId;
                model[key] = {result: report.teamInfo, comment: report.commentary};

                session.addJob(
                    order.api,
                    order.reqId,
                    undefined,
                    undefined,
                    G_PICO_WEB.RENDER_FULL,
                    [[session.createModelInfo(MATCH_MODEL_ID, key)]]
                );

                model[homeUserId] = [homeUserId, leagueId, homeScore];
                model[awayUserId] = [awayUserId, leagueId, awayScore];

                session.addJob(
                    order.api,
                    order.reqId,
                    exports,
                    exports.updateLeague,
                    G_PICO_WEB.RENDER_NO,
                    [[session.createModelInfo(MATCH_MODEL_ID, homeUserId)],[session.createModelInfo(MATCH_MODEL_ID, awayUserId)]]
                );

                next();
            });
        });
    });
};

exports.updateLeague = function(models, cb){
    var
    model = models[0],
    userId = model[0],
    leagueId = model[1],
    score = model[2];

    redisLeagues.updateLeague(leagueId, userId, score, function(err){
        cb(err, models);
    });
};
