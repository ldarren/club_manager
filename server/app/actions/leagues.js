require('../config/const');

var
rosterCreator = require('node-esms/build/Release/roster_creator'),
tsc = require('node-esms/build/Release/tsc'),
fixtures = require('node-esms/build/Release/fixtures'),
esms = require('node-esms/build/Release/esms'),
updtr = require('node-esms/build/Release/updtr'),
esmsOpt = {
    set_rnd_seed: 56473,
    penalty_diff: 1,
    penalty_score: 1,
    penalty_shootout: false,
    team_stats_total: 0
},
updtrOpt = {
    choice: 5
};

const
MODEL_LEAGUE = G_SESSION.LEAGUE_DATA,
MODEL_TEAM = G_SESSION.TEAM_DATA,
MODEL_FIXTURES = G_SESSION.FIXTURES_DATA,
MODEL_MATCH = G_SESSION.MATCH_DATA;

function createMatch(session, order, next){
    var
    model = session.getModel(MODEL_MATCH),
    data = order.data,
    modelInfo = [],
    league = data['league'],
    team1 = data['team1'],
    team2 = data['team2'],
    n1 = team1.name,
    n2 = team2.name,
    r1 = team1.players,
    r2 = team2.players,
    ts1 = tsc(n1, '442N', r1, leagueDat),
    ts2 = tsc(n2, '442N', r2, leagueDat),
    report = esms(esmsOpt, leagueDat, leagueAbilities, languageDat, tacticsDat, ts1, ts2, r1, r2),
    result = updtr(updtrOpt, leagueDat, report.teamInfo, report.teamStatistics, league, r1, r2),
    modelInfo = [];

    model['me'] = {result: report.teamInfo, comment: report.commentary, league:result.leagueTable};
    modelInfo.push([{modelId:MODEL_MATCH, key:'me'}]);

    session.addJob(
        order.api,
        order.reqId,
        undefined,
        undefined,
        G_PICO_WEB.RENDER_FULL,
        modelInfo
    );

    next();
}

function createFixtures(session, order, next){
    var
    model = session.getModel(MODEL_FIXTURES),
    data = order.data,
    teamNames = [],
    modelInfo = [];

    for (var i=0,l=data.length; i<l; i++){
        teamNames.push(data[i].name);
    }
    model['me'] = fixtures(teamNames);
    modelInfo.push([{modelId:MODEL_FIXTURES, key:'me'}]);

    session.addJob(
        order.api,
        order.reqId,
        undefined,
        undefined,
        G_PICO_WEB.RENDER_FULL,
        modelInfo
    );

    next();
}

exports.setup = function(context, next){
    var web = context.webServer;

    web.route(G_API.LEAGUE_READ, [createFixtures]);
    web.route(G_API.FIXTURES_CREATE, [createFixtures]);
    web.route(G_API.MATCH_CREATE, [createMatch]);

    next();
};