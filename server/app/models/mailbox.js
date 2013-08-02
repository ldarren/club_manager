exports.setup = function(context, next){
    next();
};

exports.getAllRecipients = function(cb){
    return cb(null, []);
};

exports.getMessages =  function(userId, cb){
    return cb();
}
