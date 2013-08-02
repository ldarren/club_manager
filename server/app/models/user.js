var
redisUser = require('./redis/user'),
sqlUser = require('./sql/user');

const
MODEL_ID = G_SESSION.USERS;

exports.create = function(session, order, cb){
    var
    model = session.getModel(MODEL_ID),
    data = order[G_CONST.DATA],
    api = order[G_CONST.API],
    args = G_ARGS[api],
    arg;

session.log(model[G_CONST.USER_ID]);
    if (model[G_CONST.USER_ID]) return cb('already own a team');

    for(var i=0, l=args.length; i<l; i++){
        arg = args[i];
        model[arg] = data[arg];
    }

    if (
        !model[G_CONST.MANAGER_NAME] || 
        !model[G_CONST.MANAGER_NATION] || 
        !model[G_CONST.CLUB_NAME] || 
        !model[G_CONST.CLUB_GROUND]
        )
        return cb('Not enough parameter');

    session.addJob(
        G_CONST.CREATE,
        api,
        order[G_CONST.REQ_ID],
        sqlUser,
        sqlUser.save,
        true,
        [MODEL_ID],
        args,
        G_CONST.USER_ID
    );

    cb();
};

exports.loadTeam = function(session, order, cb){
session.log(order);
    var
    data = order[G_CONST.DATA],
    userId = parseInt(data[G_CONST.USER_ID]),
    args = [G_CONST.USER_ID, G_CONST.MANAGER_NAME, G_CONST.EMAIL, G_CONST.PASSWORD, G_CONST.MANAGER_NATION, G_CONST.CLUB_NAME, G_CONST.CLUB_GROUND, G_CONST.STADIUM];
    if (!userId) return cb('invalid params');
    sqlUser.getByUserId(userId, function(err, results){
console.log('err', err, results);
        if (err) return cb(err);
        var
        result = results[0],
        model = session.getModel(MODEL_ID);

        for(var i=0, l=args.length; i<l; i++){
            arg = args[i];
            model[arg] = result[arg];
        }

        session.addJob(
            G_CONST.READ,
            order[G_CONST.API],
            order[G_CONST.REQ_ID],
            undefined,
            undefined,
            false,
            [MODEL_ID],
            args,
            undefined
        );
        cb();
    });
};

exports.loadTeamByEmail = function(session, order, cb){
    var
    data = order[G_CONST.DATA],
    email = data[G_CONST.EMAIL],
    args = [G_CONST.USER_ID, G_CONST.MANAGER_NAME, G_CONST.EMAIL, G_CONST.PASSWORD, G_CONST.MANAGER_NATION, G_CONST.CLUB_NAME, G_CONST.CLUB_GROUND, G_CONST.STADIUM];

    if (!email) return cb('invalid params');
    sqlUser.getByEmail(email, function(err, results){
console.log('err', err, results);
        if (err) return cb(err);
        if (!results.length) return cb('email not found:', email);
        var
        result = results[0],
        model = session.getModel(MODEL_ID);

        for(var i=0, l=args.length; i<l; i++){
            arg = args[i];
            model[arg] = result[arg];
        }
        order.data[G_CONST.USER_ID] = model[G_CONST.USER_ID];

        session.addJob(
            G_CONST.READ,
            order[G_CONST.API],
            order[G_CONST.REQ_ID],
            undefined,
            undefined,
            true,
            [MODEL_ID],
            args,
            undefined
        );
        cb();
    });
};
