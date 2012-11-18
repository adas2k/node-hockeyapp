(function() {
  var HockeyAppAPI, api_root_path, apps, https, options, platforms, release_types, users;

  apps = require('./Apps.js');

  users = require('./Users.js');

  https = require('https');

  options = {
    host: 'rink.hockeyapp.net',
    port: 443
  };

  platforms = ["iOS", "Android", "Mac OS", "Windows Phone", "Custom"];

  release_types = ["0", "1", "2"];

  api_root_path = '/api/2';

  HockeyAppAPI = (function() {

    function HockeyAppAPI(api_token) {
      this.api_token = api_token;
      this.Apps = new apps(this);
      this.Users = new users(this);
    }

    HockeyAppAPI.prototype.executeRequest = function(url, method, opts, cb) {
      var request;
      if (opts != null) opts = JSON.stringify(opts);
      options.path = url;
      options.method = method;
      options.headers = {
        'X-HockeyAppToken': this.api_token
      };
      if (opts != null) options.header['Content-Length'] = opts.length;
      console.log(opts);
      console.log(options);
      options.agent = new https.Agent(options);
      request = https.request(options, function(response) {
        var d;
        d = '';
        response.on('data', function(chunk) {
          return d += chunk;
        });
        response.on('end', function() {
          var val;
          val = JSON.parse(d);
          if (val.errors != null) cb(val, null);
          return cb(null, val);
        });
        return response.on('error', function(e) {
          return cb(e, null);
        });
      });
      if (opts != null) request.write(opts);
      return request.end();
    };

    return HockeyAppAPI;

  })();

  module.exports = HockeyAppAPI;

}).call(this);
