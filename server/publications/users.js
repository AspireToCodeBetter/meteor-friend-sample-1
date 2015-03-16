// Source: [Add computed fields to Meteor.users in a publication - Stack Overflow](http://stackoverflow.com/questions/25519205/add-computed-fields-to-meteor-users-in-a-publication)

Meteor.publishComposite("users", function() {
  return {
    find: function() {
      // only publish the fields you really need
      var fields = {username: 1, emails: 1, profile: 1};

      return Meteor.users.find({},{fields: fields});
    }
  }
});
