(function() {
  var doGet, doPost, https, options;

  https = require('https');

  options = {
    host: 'rink.hockeyapp.net',
    port: 443
  };

  doPost = function(url, opts, cb) {
    var req, request;
    options.path = opts.path;
    options.method = 'POST';
    request = function(response) {
      var d;
      d = '';
      response.on('data', function(chunk) {
        return d += chunk;
      });
      response.on('end', function() {
        return cb(null, d);
      });
      return response.on('error', function(e) {
        return cb(e, null);
      });
    };
    req = https.request(options, request);
    req.write(opts.data);
    return req.end;
  };

  doGet = function(url, opts, cb) {};

}).call(this);
