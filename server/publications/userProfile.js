// Source: [Add computed fields to Meteor.users in a publication - Stack Overflow](http://stackoverflow.com/questions/25519205/add-computed-fields-to-meteor-users-in-a-publication)

Meteor.publish("userProfile", function(userId) {
  console.log("In the user profile subscription for: " + userId);
  console.log("In the user profile subscription, the logged in user is: " + this.userId);
  // only publish the fields you really need
  var fields = {username: 1, emails: 1, profile: 1};
  return Meteor.users.find(userId,{fields: fields});
});
