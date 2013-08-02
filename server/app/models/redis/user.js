var
client;

exports.setup = function(context, next){
    client = context.redisUsers;
    next();
};
