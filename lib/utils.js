(function() {
  var https, options;

  https = require('https');

  options = {
    host: 'rink.hockeyapp.net',
    port: 443
  };

  exports.executeRequest = function(url, method, token, opts, cb) {
    var request;
    if (opts != null) opts = JSON.stringify(opts);
    options.path = url;
    options.method = method;
    options.headers = {
      'X-HockeyAppToken': token
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
        return cb(null, d);
      });
      return response.on('error', function(e) {
        return cb(e, null);
      });
    });
    if (opts != null) request.write(opts);
    return request.end();
  };

}).call(this);
