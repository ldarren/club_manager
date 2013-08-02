var
client,
firstNames = [],
middleNames = [],
lastNames = [];

const
GET_FIRST_NAMES = 'SELECT name FROM names WHERE isFirst = 1;',
GET_MIDDLE_NAMES = 'SELECT name FROM names WHERE isMiddle = 1;',
GET_LAST_NAMES = 'SELECT name FROM names WHERE isLast = 1;';

exports.createName = function(){
    fn = firstNames[Math.floor(firstNames.length*Math.random())];
    mn = middleNames[Math.floor(middleNames.length*Math.random())];
    ln = lastNames[Math.floor(lastNames.length*Math.random())];
    return [fn, mn, ln];
};

function selectNames(statement, cont, cb){
    client.query(statement, [], function(err, result){
        if (err) return cb(err);
        for(var i=0, l=result.length; i<l; i++){
            cont.push(result[i].name);
        }
        cb();
    });
}

exports.setup = function(context, next){
    client = context.sqlUsers;
    selectNames(GET_FIRST_NAMES, firstNames, function(err){
        if (err) return next(err);
        selectNames(GET_MIDDLE_NAMES, middleNames, function(err){
            if (err) return next(err);
            selectNames(GET_LAST_NAMES, lastNames, function(err){
                if (err) return next(err);
                next();
            });
        });
    });
};
