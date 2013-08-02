GGameSettings = {};
var
client;

const GET = 'SELECT * FROM gameSettings;';

exports.setup = function(context, next){
    client = context.sqlUsers;
    client.query(GET, [], function(err, result){
        if (err) return next(err);
        var setting, value;
        for(var i=0, l=result.length; i<l; i++){
            setting = result[i];
            value = parseInt(setting.value);
            GGameSettings[setting.key] = (value === NaN ? setting.value : value);
        }
        Object.freeze(GGameSettings);
        next();
    });
};
