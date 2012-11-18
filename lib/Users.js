(function() {
  var Users;

  Users = (function() {

    function Users(parent) {
      this.parent = parent;
    }

    Users.prototype.listUsers = function(identifier, cb) {
      return this.parent.executeRequest('/api/2/apps/' + identifier + '/app_users', 'GET', null, function(err, data) {
        return cb(err, data);
      });
    };

    Users.prototype.addUser = function(identifier, opts, cb) {
      return this.parent.executeRequest('/api/2/apps/' + identifier + '/app_users', 'POST', opts, function(err, data) {
        return cb(err, data);
      });
    };

    Users.prototype.checkMembership = function(identifier, opts, cb) {
      var query;
      query = querystring.stringify(opts);
      return this.parent.executeRequest('/api/2/apps/' + identifier + '/app_users/check?' + query, 'GET', null, function(err, data) {
        return cb(err, data);
      });
    };

    Users.prototype.deleteUser = function(identifier, userId, cb) {
      return this.parent.executeRequest('/api/2/apps/' + identifier + '/app_users/' + userId, 'DELETE', null, function(err, data) {
        return cb(err, data);
      });
    };

    return Users;

  })();

  module.exports = Users;

}).call(this);
