var leagues = require('../models/leagues');

exports.setup = function(context, next){
    var web = context.webServer;

    web.route(G_API.LEAGUE_READ, [leagues.get]);
    web.route(G_API.FIXTURES_READ, [leagues.makeFixture]);
    web.route(G_API.MATCH_CREATE, [leagues.createMatch]);

    next();
};
