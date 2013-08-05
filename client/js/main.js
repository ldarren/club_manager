pico.def(G_SESSION.TEAM_DATA, 'piDataModel', function(){
    var
    me = this;

    me.create = function(teamCount, cb){
        var
        data = me.get(),
        diff = teamCount - data.length,
        query = [],
        name;

        if (diff < 1) return cb(null, data);

        for (var i=0; i<diff; i++){
            name = 'team'+i;
            query.push({name:name});
        }

        me.requestOnce(G_CCONST.CREATE, query, function(err, data){
            if (err) return cb(err);
            cb(null, me.get());
        });
    };

    me.setup = function(){
        me.init(G_SESSION.TEAM_DATA, ['name']);
    };
});

pico.def(G_SESSION.LEAGUE_DATA, 'piDataModel', function(){
    this.use(G_SESSION.TEAM_DATA);

    var
    me = this,
    league = [];

    me.create = function(cb){
        me[G_SESSION.TEAM_DATA].create(14, function(err, teams){
            if (err) return cb(err);

            var team;
            for(var i=0,l=teams.length; i<l; i++){
                team = teams[i];
                //PLACE TEAMNAME+ PL W D L GF GA GD PTS
                league.push([i+1, team.name, 0, 0, 0, 0, 0, 0, 0, 0]);
            }
            cb(null, league);
        });
    };

    me.getLeague = function(){
        return league;
    };

    me.setLeague = function(l){
        league = l;
        me.signal('leagueupdate', [null, league]);
    };

    me.setup = function(){
        me.init(G_SESSION.LEAGUE_DATA, ['name']);
    };
});

pico.def(G_SESSION.FIXTURES_DATA, 'piDataModel', function(){
    this.use(G_SESSION.TEAM_DATA);

    var
    me = this,
    schedule;

    me.create = function(cb){
        var
        data = me[G_SESSION.TEAM_DATA].get(),
        query = [];

        for (var i=0, l=data.length; i<l; i++){
            query.push({name:data[i].name});
        }

        me.requestOnce(G_CCONST.CREATE, query, function(err, data){
            if (err) return cb(err);
            schedule = data;
            console.log(schedule);
            cb(null, schedule);
        });
    };

    me.setup = function(){
        me.init(G_SESSION.FIXTURES_DATA, ['name']);
    };
});

pico.def(G_SESSION.MATCH_DATA, 'piDataModel', function(){
    this.use(G_SESSION.TEAM_DATA);
    this.use(G_SESSION.LEAGUE_DATA);

    var
    me = this;

    me.create = function(team1, team2, cb){
        var
        teamData = me[G_SESSION.TEAM_DATA],
        leagueData = me[G_SESSION.LEAGUE_DATA],
        league = leagueData.getLeague(),
        r1 = teamData.get({name:team1})[0],
        r2 = teamData.get({name:team2})[0];

        me.requestOnce(G_CCONST.CREATE, {team1:r1, team2:r2, league:league}, function(err, data){
            if (err) return cb(err);
            var matchResult = data['all']; // due to no key value
            leagueData.setLeague(matchResult.league);
            cb(null, matchResult);
        });
    };

    me.setup = function(){
        me.init(G_SESSION.MATCH_DATA, ['name']);
    };
});

pico.def(G_SESSION.USER_DATA, 'piDataModel', function(){
    this.setup = function(){
        this.init(this.moduleName, ['email']);
    };
});

pico.def(G_SESSION.PLAYER_DATA, 'piDataModel', function(){
    var
    me = this,
    userId,
    onUsersUpdated = function(){
        var
        userData = me[G_SESSION.USER_DATA],
        users = userData.get('all', ['email']),
        user = users[0];
        if (!user || !user.userId) return;

        if (userId !== user.userId || !me.isValid()){
            userId = user.userId;
            me.request(G_CCONST.INIT, {userId: userId});
        }
    };

    me.use(G_SESSION.USER_DATA);

    me.setup = function(){
        var userData = me[G_SESSION.USER_DATA];
        me.init(me.moduleName, ['userId']);
/*        userData.slot('update', onUsersUpdated);
        if (userData.isValid()){
            onUsersUpdated();
        }*/
    };
});

pico.def('mgr433', function(){
    this.use(G_SESSION.LEAGUE_DATA);
    this.use(G_SESSION.TEAM_DATA);
    this.use(G_SESSION.FIXTURES_DATA);
    this.use(G_SESSION.MATCH_DATA);
    this.use(G_SESSION.USER_DATA);
    this.use(G_SESSION.PLAYER_DATA);
    this.use('piDataNet');

    var
    me = this,
    onLoad = function(){
        me.piDataNet.init({
            pushURL: 'http://54.245.113.90:4000/push',
            pullURL: 'http://54.245.113.90:4000/pull',
            beatRate: 3000
        });
        me[G_SESSION.LEAGUE_DATA].setup();
        me[G_SESSION.TEAM_DATA].setup();
        me[G_SESSION.FIXTURES_DATA].setup();
        me[G_SESSION.MATCH_DATA].setup();
        me[G_SESSION.USER_DATA].setup();
        me[G_SESSION.PLAYER_DATA].setup();
        pico.addFrame(document.body, 'div#page', 'views/pageLogin.html');
    };

    pico.slot(pico.LOAD, onLoad);
    pico.changeHash('');
});
