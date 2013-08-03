exports.setup = function(context, next){
    var web = context.webServer;
    web.route(G_API.USER_CREATE, [setTeamInfo]);
    web.route(G_API.TEAM_INIT, [getTeamInfo, setTeamMembers]);
    web.route(G_API.USER_READ, [getTeamInfoByEmail, getTeamMembers]);
    web.route(G_API.TEAM_READ, [getTeamMembers]);
    next();
};

var
mUser = require('../models/user'),
mPlayers = require('../models/players');

function setTeamInfo(session, order, next){
    mUser.create(session, order, function(err){
        return next(err);
    });
}

function setTeamMembers(session, order, next){
    mPlayers.createTeamMembers(session, order, GGameSettings.initTeamSize, GGameSettings.baseStatBronze, GGameSettings.focusStatBronze, GGameSettings.playerMinAge, function(err){
        return next(err);
    });
}

function getTeamInfo(session, order, next){
    mUser.loadTeam(session, order, function(err){
        return next(err);
    });
}

function getTeamInfoByEmail(session, order, next){
    mUser.loadTeamByEmail(session, order, function(err){
        return next(err);
    });
}

function getTeamMembers(session, order, next){
    mPlayers.loadTeamMembers(session, order, function(err){
        return next(err);
    });
}
