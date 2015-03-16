// Source: [Add computed fields to Meteor.users in a publication - Stack Overflow](http://stackoverflow.com/questions/25519205/add-computed-fields-to-meteor-users-in-a-publication)

Meteor.publish("userProfile", function(userId) {
  console.log("In the user profile subscription for: " + userId);
  console.log("In the user profile subscription, the logged in user is: " + this.userId);

  check(userId, String);
  // only publish the fields you really need
  var fields = {username: 1, emails: 1, profile: 1};
  var self = this;

  // modify this as needed
  var transform = function(user) {
    console.log("In the user profile subscription, checking for transformation, the logged in user is: " + self.userId);
    console.log("Friends are: " + user.profile.friends);
    user.profile.friends = _.filter(user.profile.friends, function(userId) {return userId === self.userId});
    console.log("Friends are: " + user.profile.friends);
    console.log("Type of Friends are: " + (user.profile.friends.length > 0));
    user.isFriend = (user.profile.friends.length > 0) ? true : false;
    return user;
  };



  var handle = Meteor.users.find(userId, {fields: fields}).observe({
    added: function (user) {
      self.added('users', user._id, transform(user));
    },

    changed: function (user) {
      self.changed('users', user._id, transform(user));
    },

    removed: function (user) {
      self.removed('users', user._id);
    }
  });

  this.ready();

  this.onStop(function() {
    handle.stop();
  });
});
