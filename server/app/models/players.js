var
memNames = require('../models/mem/names'),
sqlPlayers = require('./sql/players');

const
MODEL_ID = G_SESSION.PLAYER_DATA;

exports.loadTeamMembers = function(session, order, cb){
    var
    data = order.data
    email = data[G_CONST.EMAIL];

    if (!email) return cb('invalid params');

    var
    model = session.getModel(G_SESSION.USER_DATA),
    userInfo = model[email],
    userId = parseInt(userInfo[G_CONST.USER_ID]);

    sqlPlayers.getByUserId(userId, function(err, results){
        if (err) return cb(err);
        var members = [];

        for(var i=0, l=results.length; i<l; i++){
            members.push(results[i]);
        }
        userInfo[G_CONST.TEAM] = members;
        cb();
    });
};
