var
client;

const
SAVE = 'INSERT INTO users (email, password, name, nationality, club, ground, stadium, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW());',
GET_BY_USER_ID = 'SELECT * FROM users WHERE userId = ?;',
GET_BY_EMAIL = 'SELECT * FROM users WHERE email = ?;'; 

exports.setup = function(context, next){
    client = context.sqlUsers;
    next();
};

exports.save = function(models, cb){
console.log(JSON.stringify(models));
    var data = models[0];
    client.query(SAVE, [
        data[G_CONST.EMAIL],
        data[G_CONST.PASSWORD],
        data[G_CONST.MANAGER_NAME],
        data[G_CONST.MANAGER_NATION],
        data[G_CONST.CLUB_NAME],
        data[G_CONST.CLUB_GROUND],
        data[G_CONST.STADIUM]
    ], cb);
};

exports.getByUserId = function(userId, cb){
    client.query(GET_BY_USER_ID, [userId], cb);
};

exports.getByEmail = function(email, cb){
    client.query(GET_BY_EMAIL, [email], cb);
};
