(function() {
  var Apps;

  Apps = (function() {

    function Apps(parent) {
      this.parent = parent;
    }

    Apps.prototype.createNewApp = function(opts, cb) {
      if (!(opts.platform != null)) opts.platform = 'iOS';
      if (!(opts.release_type != null)) opts.release_type = '0';
      return this.parent.executeRequest('/api/2/apps/new', 'POST', token, opts, function(err, data) {
        return cb(err, data);
      });
    };

    Apps.prototype.listApps = function(cb) {
      return this.parent.executeRequest('/api/2/apps', 'GET', null, function(err, data) {
        return cb(err, data);
      });
    };

    Apps.prototype.deleteApp = function(identifier, cb) {
      return this.parent.executeRequest('/api/2/apps/' + identifier, 'DELETE', null, function(err, data) {
        return cb(err, data);
      });
    };

    Apps.prototype.listVersionsForDevelopers = function(identifier, cb) {
      return this.parent.executeRequest('/api/2/apps/' + identifier + '/app_verions', 'GET', null, function(err, data) {
        return cb(err, data);
      });
    };

    Apps.prototype.listVersionsForTesters = function(identifier, cb) {
      var query, tmp;
      tmp = {};
      tmp.format = 'json';
      query = querystring.stringify(tmp);
      return this.parent.executeRequest('/api/2/apps' + identifier + '?' + query, 'GET', null, function(err, data) {
        return cb(err, data);
      });
    };

    Apps.prototype.deleteSingleVersion = function(identifier, id, cb) {
      return this.parent.executeRequest('/api/2/apps' + identifier + '/app_verions/' + id, 'DELETE', null, function(err, data) {
        return cb(err, data);
      });
    };

    Apps.prototype.deleteMultipleVersions = function(identifier, opts, cb) {
      return this.parent.executeRequest('/api/2/apps/' + identifier + '/app_verions/delete', 'POST', opts, function(err, data) {
        return cb(err, data);
      });
    };

    return Apps;

  })();

  module.exports = App;

}).call(this);
