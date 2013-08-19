var
mUsers = require('../models/users'),
mPlayers = require('../models/players');

exports.setup = function(context, next){
    var web = context.webServer;
    web.route(G_API.USER_CREATE, [mUsers.create]);
    web.route(G_API.USER_READ, [mUsers.loadTeamByEmail, mPlayers.loadTeamMembers]);
    next();
};
