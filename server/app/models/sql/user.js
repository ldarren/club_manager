var
client;

const
SAVE = 'INSERT INTO users (name, email, password, nationality, club, ground, stadium, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW());',
GET_BY_USER_ID = 'SELECT * FROM users WHERE userId = ?;',
GET_BY_EMAIL = 'SELECT * FROM users WHERE email = ?;'; 

exports.setup = function(context, next){
    client = context.sqlUsers;
    next();
};

exports.save = function(params, cb){
    client.query(SAVE, params, cb);
};

exports.getByUserId = function(userId, cb){
    client.query(GET_BY_USER_ID, [userId], cb);
};

exports.getByEmail = function(email, cb){
    client.query(GET_BY_EMAIL, [email], cb);
};
