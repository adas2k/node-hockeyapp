(function() {
  var HockeyAppAPI, platforms, release_types, utils,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  utils = require('./utils.js');

  platforms = ["iOS", "Android", "Mac OS", "Windows Phone", "Custom"];

  release_types = ["0", "1", "2"];

  HockeyAppAPI = (function() {

    function HockeyAppAPI() {}

    return HockeyAppAPI;

  })();

  HockeyAppAPI.createNewApp = function(token, opts, cb) {
    var _ref, _ref2;
    if (opts == null) throw new Error("Missing API request parameters");
    if (opts.title == null) throw new Error("Missing parameter: title");
    if (opts.bundle_identifier == null) {
      throw new Error("Missing parameter: bundle_identifier");
    }
    if (_ref = !opts.platform, __indexOf.call(platforms, _ref) >= 0) {
      throw new Error("Unknown param: " + opts.platform);
    }
    if (_ref2 = !opts.release_type, __indexOf.call(release_types, _ref2) >= 0) {
      throw new Error("Unknown release type" + opts.release_type);
    }
    if (!(opts.platform != null)) opts.platform = 'iOS';
    if (!(opts.release_type != null)) opts.release_type = '0';
    return utils.executeRequest('/api/2/apps/new', 'POST', token, opts, function(err, data) {
      return cb(err, data);
    });
  };

  HockeyAppAPI.getInvites = function(token, opts, cb) {
    return utils.executeRequest('/api/2/invites', 'GET', token, null, function(err, data) {
      return cb(err, data);
    });
  };

  module.exports = HockeyAppAPI;

}).call(this);
