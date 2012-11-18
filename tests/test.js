(function() {
  var hockey, opts;

  hockey = require("./lib/HockeyAppAPI.js");

  opts = {};

  opts.title = "test1";

  opts.bundle_identifier = "com.android.labs.das";

  hockey.getInvites('279c4f96f454b8898b2fc78dcd1f79f', opts, function(err, data) {
    if (err) {
      console.log('Error');
      console.log(err);
    }
    return console.log(data);
  });

}).call(this);
