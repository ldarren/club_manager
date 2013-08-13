var
mUser = require('../models/user'),
mPlayers = require('../models/players');

exports.setup = function(context, next){
    var web = context.webServer;
    web.route(G_API.USER_CREATE, [mUser.create]);
    web.route(G_API.USER_READ, [mUser.loadTeamByEmail, mPlayers.loadTeamMembers]);
    next();
};

function getTeamInfo(session, order, next){
    mUser.loadTeam(session, order, function(err){
        return next(err);
    });
}
